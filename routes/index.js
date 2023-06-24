/*
File: index.js
Student's Name: Rayyan Mohsin
StudentID: 301270163
Date: June 4, 2023
*/

const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'portfolio';
const collectionName = 'users';

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
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.redirect('/login');
      return;
    }

    const db = client.db(dbName);
    const usersCollection = db.collection(collectionName);

    usersCollection.findOne({ username, password }, (err, user) => {
      if (err) {
        console.error('Error retrieving user:', err);
        res.redirect('/login');
      } else {
        if (user) {
          req.session.user = user;
          res.redirect('/business-contacts');
        } else {
          res.redirect('/login');
        }
      }

      client.close();
    });
  });
});

// Business Contacts List route
router.get('/business-contacts', (req, res) => {
  const user = req.session.user;
  if (user) {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (err) {
        console.error('Error connecting to the database:', err);
        res.redirect('/');
        return;
      }

      const db = client.db(dbName);
      const usersCollection = db.collection(collectionName);

      usersCollection.find().toArray((err, contacts) => {
        if (err) {
          console.error('Error retrieving contacts:', err);
          res.redirect('/');
        } else {
          res.render('business-contacts', { title: 'Business Contacts', contacts });
        }

        client.close();
      });
    });
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
