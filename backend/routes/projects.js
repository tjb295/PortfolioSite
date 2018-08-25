const express = require('express');
const Project = require('../models/project');
const multer = require('multer');

const router = express.Router();

/*Middleware to authenticate upon requests*/
const checkAuth = require('../middleware/check-auth');

/*Mime type mapping and multer storage config*/
const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg': 'jpg',
  'image/jpg' : 'jpg'
};

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error('Invalid mime type');
      if(isValid) {
        error = null;
      }
      cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

/*routing for project: POSTs*/
router.post('', multer({storage: storage}).single("image"), (req, res, next) => {

  console.log(req.body);
  console.log(req.files);

  const url = req.protocol + '://' + req.get('host');
  console.log(url);
  const project = new Project({
    type: req.body.type,
    title: req.body.title,
    languages: req.body.languages,
    tagline: req.body.tagline,
    overview: req.body.overview,
    design: req.body.design,
    code: req.body.code,
    future: req.body.future,
    github: req.body.github,
    image: '/images/' + req.body.image
  });



  /*Save to DB*/
  project.save().then(createdProject => {
    res.status(201).json({
      message: 'Project added successfully',
      project: {
        title: createdProject.title,
        type: createdProject.type,
        languages: createdProject.languages,
        overview: createdProject.overview,
        design: createdProject.design,
        tagline: createdProject.tagline,
        code: createdProject.code,
        future: createdProject.future,
        _id: createdProject._id,
        github: createdProject.github
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
