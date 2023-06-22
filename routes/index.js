/*
File: index.js
Student's Name: Rayyan Mohsin
StudentID: 301270163
Date: June 4, 2023
*/

const express = require('express');
const router = express.Router();
const users = [
  { username: 'admin', password: 'admin123' },
  { username: 'user', password: 'user123' }
];

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

// Login Page route
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Authentication route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    req.session.user = user;
    res.redirect('/business-contacts');
  } else {
    res.redirect('/login');
  }
});

// Business Contacts List route
router.get('/business-contacts', (req, res) => {
  const user = req.session.user;
  if (user) {
    const contacts = [
      { name: 'John Doe', contactNumber: '1234567890', email: 'john@example.com' },
      { name: 'Jane Smith', contactNumber: '9876543210', email: 'jane@example.com' }
    ];
    res.render('business-contacts', { title: 'Business Contacts', contacts });
  } else {
    res.redirect('/login');
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
