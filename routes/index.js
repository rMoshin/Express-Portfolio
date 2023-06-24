/*
File: styles.css
Student's Name: Rayyan Mohsin
StudentID: 301270163
Date: June 24, 2023
*/

const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://0.0.0.0:27017';
const dbName = 'portfolio';
const collectionName = 'users';

// Home Page route
router.get('/', (req, res) => {
  const user = req.session.user;
  res.render('home', { title: 'Home Page', user });
});

// Contact Me Page route
router.get('/contact', (req, res) => {
  const user = req.session.user;
  res.render('contact', { title: 'Contact Me', user });
});

// About Page route
router.get('/about', (req, res) => {
  const user = req.session.user;
  res.render('about', { title: 'About', user });
});

// Projects Page route
router.get('/projects', (req, res) => {
  const user = req.session.user;
  res.render('projects', { title: 'Projects', user });
});

// Services Page route
router.get('/services', (req, res) => {
  const user = req.session.user;
  res.render('services', { title: 'Services', user });
});

// Login Page route
router.get('/login', (req, res) => {
  const user = req.session.user;
  res.render('login', { title: 'Login', user });
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

      res.render('business-contacts', { title: 'Business Contacts', contacts, user });

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

// Update Contact Page route
router.get('/update/:id', async (req, res) => {
  const user = req.session.user;
  if (user) {
    try {
      const id = req.params.id;
      // Create a new MongoClient
      const client = new MongoClient(url, { useUnifiedTopology: true });

      // Connect to the MongoDB server
      await client.connect();

      console.log('Connected to the database');

      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Find the contact with the provided id
      const contact = await collection.findOne({ _id: new ObjectId(id) });

      res.render('update', { title: 'Update Contact', contact, user });

      // Close the client connection
      client.close();
    } catch (err) {
      console.error('Error retrieving contact:', err);
      res.redirect('/business-contacts');
    }
  } else {
    res.redirect('/login');
  }
});

// Update Contact route
router.post('/update/:id', async (req, res) => {
  const user = req.session.user;
  if (user) {
    try {
      const id = req.params.id;
      const { username, password, email, contact } = req.body;

      // Create a new MongoClient
      const client = new MongoClient(url, { useUnifiedTopology: true });

      // Connect to the MongoDB server
      await client.connect();

      console.log('Connected to the database');

      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Update the contact with the provided id
      await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { username, password, email, contact } }
      );

      res.redirect('/business-contacts');

      // Close the client connection
      client.close();
    } catch (err) {
      console.error('Error updating contact:', err);
      res.redirect('/business-contacts');
    }
  } else {
    res.redirect('/login');
  }
});

// Delete Contact route
router.get('/delete/:id', async (req, res) => {
  const user = req.session.user;
  if (user) {
    try {
      const id = req.params.id;

      // Create a new MongoClient
      const client = new MongoClient(url, { useUnifiedTopology: true });

      // Connect to the MongoDB server
      await client.connect();

      console.log('Connected to the database');

      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Delete the contact with the provided id
      await collection.deleteOne({ _id: new ObjectId(id) });

      res.redirect('/business-contacts');

      // Close the client connection
      client.close();
    } catch (err) {
      console.error('Error deleting contact:', err);
      res.redirect('/business-contacts');
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
