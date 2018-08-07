//thi will hold express app setup
const express = require('express');
const mongoose = require('mongoose');
var path = require('path');
const bodyParser = require('body-parser');

const projectRoute = require('./routes/projects');

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
app.use('/', express.static(path.join(__dirname, 'dist')));


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

/*Get home page at root route */
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use('/images', express.static(path.join('backend/images')));

app.use('/api/projects', projectsRoute);

module.exports = app;
