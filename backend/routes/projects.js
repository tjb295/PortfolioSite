const express = require('express');
const Project = require('../models/project');
const multer = require('multer');

const router = express.Router();

/*routing for project*/
router.post('', (req, res, next) => {


  const project = new Project({
    title: req.body.title,
    tagline: req.body.tagline,
    overview: req.body.overview,
    design: req.body.design,
    code: req.body.code,
    future: req.body.future
  });

});

/*Export the router*/
module.exports = router;
