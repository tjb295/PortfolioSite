/*Defining the schema for the projects to be held*/
const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  title: String,
  tagline: String,
  overview: String,
  design: String,
  code: String,
  future: String,
  titleImg: [String],
  projectImg: [String],
  designImg: [String],
  technologyImg: [String]
});

module.exports = mongoose.model('Project'. projectSchema);
