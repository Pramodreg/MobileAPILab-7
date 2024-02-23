const express = require('express');
const router = express.Router();
const User = require('../model/user.js');
const Movie = require('../model/movies'); 
const movieController = require('../controllers/controller.js');
const authController = require('../controllers/authcontroller.js');
const middleware = require('../middleware/middleware.js');

//Register a new user
router.post('/register',authController.registerUser);
//Login user
router.post('login',authController.loginUser);
//logout user
router.get('logout',authController.logoutUser);
router.post('/protected',middleware.isAuthenticated,authController.protectedRoutes);


router.post('/movies', middleware.logCreateRequest, movieController.createMovie);
router.get('/movies', middleware.logReadRequest, movieController.getAllMovies);
router.put('/movies/:id', middleware.logUpdateRequest, movieController.updateMovie);
router.delete('/movies/:id', middleware.logDeleteRequest, movieController.deleteMovie);


module.exports = router;
