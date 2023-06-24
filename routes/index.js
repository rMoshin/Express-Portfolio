/*
File: index.js
Student's Name: Rayyan Mohsin
StudentID: 301270163
Date: June 4, 2023
*/

const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const url = 'mongodb://0.0.0.0:27017';
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
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    // Create a new MongoClient
    const client = new MongoClient(url, { useUnifiedTopology: true });

    // Connect to the MongoDB server
    await client.connect();

    console.log('Connected to the database');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Find the user matching the provided name and password
    const user = await collection.findOne({ username, password });

    if (user) {
      console.log('Logged in');
      req.session.user = user;
      res.redirect('/business-contacts');
    } else {
      res.redirect('/login');
    }

    // Close the client connection
    client.close();
  } catch (err) {
    console.error('Error retrieving users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Business Contacts List route
router.get('/business-contacts', async (req, res) => {
  const user = req.session.user;
  if (user) {
    try {
      // Create a new MongoClient
      const client = new MongoClient(url, { useUnifiedTopology: true });

      // Connect to the MongoDB server
      await client.connect();

      console.log('Connected to the database');

      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Find all contacts
      const contacts = await collection.find().toArray();

      res.render('business-contacts', { title: 'Business Contacts', contacts });

      // Close the client connection
      client.close();
    } catch (err) {
      console.error('Error retrieving contacts:', err);
      res.redirect('/');
    }
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
