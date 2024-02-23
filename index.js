const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const movieRoutes = require('./src/routes/routes.js');
const cors = require('cors');
const fs = require('fs');
const app = express();
const session = require('express-session');
const crypto = require('crypto');
const flash = require('connect-flash');
const bodyParser = require('body-parser'); // Importing bodyParser here
const User = require('./src/model/user.js');
const authRoutes = require('./src/routes/routes.js');

// Passport libraries
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

// Generating random 32-byte key
const secretKey = crypto.randomBytes(32).toString('hex'); // Fixed typo randomByte -> randomBytes
console.log(secretKey);

// Use bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use express session
app.use(
    session({
        secret: secretKey,
        resave: true,
        saveUninitialized: true
    })
);

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Setup flash middleware
app.use(flash());

// Configure passport to use a LocalStrategy with mongoose
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

dotenv.config({ path: './config.env' });

const InitiateMongoServer = require('./db');

// Initialize Mongodb Connection
InitiateMongoServer();

// Read the data from movies.json
const data = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));
console.log(data);

const mongoURI = process.env.MONGODB_URL;
mongoose.connect(mongoURI).then(() => {
    importData();
});

// Import data to MongoDB if the collection is empty
const importData = async () => {
    try {
        const Movie = require('./src/model/movies.js');
        // Check if the collection is empty
        const count = await Movie.countDocuments();
        if (count === 0) {
            await Movie.create(data);
            console.log('Data successfully imported to MongoDB');
        } else {
            console.log('Data already exists in the database');
        }
    } catch (e) {
        console.log("Error importing the data", e);
    }
};

app.get('/', async function (req, res) {
    res.send("Welcome to passport authentication");
});
app.get('/login', (req, res) => {
    res.render('login', { error: req.flash('error')[0] || null }); // Pass error or null if not defined
});

// app.get('/login', (req, res) => {
//     res.render('login');
// });

app.get('/register', (req, res) => {
    res.render('register', { error: req.flash('error') });
});
app.get('/protected', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('protected', { user: req.user });
    } else {
        res.redirect('/login');
    }
});

app.post('/auth/login', passport.authenticate('local', {
    successRedirect: '/protected',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error("Error logging out:", err);
            return next(err);
        }
        req.flash('success', 'You have been successfully logged out.');
        res.redirect('/login');
    });
});



app.use('/movie', movieRoutes);
app.use('/auth', authRoutes);

const port = process.env.PORT || 800;
app.listen(port, function () {
    console.log('App is listening to port no 800');
});
