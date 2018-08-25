//thi will hold express app setup
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var path = require('path');

const projectsRoute = require('./routes/projects');
const usersRoute = require('./routes/auth');

const app = express();

mongoose.connect('mongodb://localhost:27017/Projects')
  .then(() => {
    console.log('Connected to DB successfully.');
  })
  .catch(() => {
    console.log('Unable to connect to DB');
  });

//body parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});



app.use('/', express.static(path.join(__dirname, 'dist')));


app.use('/api/projects', projectsRoute);
app.use('/api/user', usersRoute);


/*Get home page at root route */
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

module.exports = app;
