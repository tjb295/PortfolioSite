/*Defining the schema for the projects to be held*/
const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  type: String,
  title: String,
  tagline: String,
  languages: String,
  overview: String,
  design: String,
  code: String,
  future: String,
  github: String,
  image: String,
  titleImg: String,
  projectImg: String,
  designImg: String,
  techImg: String,
  thumbNail: String
});

module.exports = mongoose.model('Project', projectSchema);
