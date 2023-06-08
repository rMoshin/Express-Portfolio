/*
File: style.css
Student's Name: Rayyan Mohsin
StudentID: 301270163
Date: June 4, 2023
*/

const express = require('express');
const router = express.Router();

// Home Page route
router.get('/', (req, res) => {
  res.render('home', { title: 'Home Page' });
});

// Contact Me Page route
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Me' });
});


// About Page route
router.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// Projects Page route
router.get('/projects', (req, res) => {
  res.render('projects', { title: 'Projects' });
});

// Services Page route
router.get('/services', (req, res) => {
  res.render('services', { title: 'Services' });
});

module.exports = router;



