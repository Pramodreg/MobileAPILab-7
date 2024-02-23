const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../model/user');
// const User = require('../model/user');

//Register a new user
exports.registerUser = async(req,res,next)=>{
    try{
        const{username, password}=req.body;
        if(!username || !password){
            req.flash('error','Username and password are required');
            return res.rediect('/register');
        }
        const existingUser = await User.findOne({username});
            if(existingUser){
                req.flash('error','Username already exists');
                return res.redirect('/register');
            }
            const user = new User({username});
            await User.register(user,password);
            req.flash('Success','User registration successful');
            res.redirect('/login');

    }
    catch(error){
        req.flash('error','Internal server error');
        res.rediect('/register');

    }
};

//Login user
exports.loginUser = (req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err){
            req.flash('error','Internal server error');
            res.rediect('/login');
        }
        if(!user){
            req.flash('error','Invalid credentials');
            res.rediect('/login');
        }

        req.logIn(user,(err)=>{
            if(err){
            req.flash('error','Invalid credentials');
            res.rediect('/login');
            }
            res.rediect('/protected');
        })

    })(req,res,next);
}

//Logout a user
exports.logoutUser = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            req.flash('error','Internal server error');
            res.rediect('/login');
        }
    })
};
exports.protectedRoutes=(req,res)=>{
    if(req.isAuthenticated()){
        res.render('protected',{user:req.user});
    }else{
        res.rediect('/login')
    }
};
module.exports = exports;