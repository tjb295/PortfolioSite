const express = require('express');
const Project = require('../models/project');
const multer = require('multer');

const router = express.Router();

/*routing for project: POSTs*/
router.post('', (req, res, next) => {


  const project = new Project({
    type: req.body.type,
    title: req.body.title,
    tagline: req.body.tagline,
    overview: req.body.overview,
    design: req.body.design,
    code: req.body.code,
    future: req.body.future
  });

  /*Save to DB*/
  project.save().then(createdProject => {
    res.status(201).json({
      message: 'Project added successfully',
      project: {
        ...createdProject,
        _id: createdProject._id
      }
    });
  });
});

/*GET with url parameter of type: Web or Mobile Application*/
router.get('/:type', (req, res, next) => {
  Project.find({type: req.params.type})
  .then(projects => {
    if(projects) {
      res.status(200).json({
        message: 'Projects Fetched.',
        projects: projects
      });
    } else {
      res.status(404).json({message: 'Incorrect Post type'});
    }
  })
});

/*GET with url paramter of id: specific one for loading*/
router.get('/:id', (req, res, next) => {
  Project.findById(req.params._id)
  .then(project => {
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({message: 'Could not find post.'});
    }
  });
});

/*Delete Method for deleting project */
router.delete('/:id', (req, res, next) => {
  Project.deleteOne({ _id: req.params.id})
  .then(result => {
    res.status(200).json({ message: 'Project Deleted Succesfully'});
  });
});


/*Export the router*/
module.exports = router;
