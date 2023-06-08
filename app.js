/*
File: app.js
Student's Name: Rayyan Mohsin
StudentID: 301270163
Date: June 4, 2023
*/

const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Set the view engine
app.set('view engine', 'ejs');

// Use the index router
app.use('/', indexRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
