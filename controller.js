const mongoose = require('mongoose');
var express = require('express');
const Movie = require('../model/movies'); 

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const { title, genre } = req.body;
    const newMovie = await Movie.create({ title, genre }); 
    res.json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre } = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(id, { title, genre }, { new: true });
    res.json(updatedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);
    res.json(deletedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

