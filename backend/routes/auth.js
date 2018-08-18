/*Routing for Authorization, login*/
const express = require('express');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
  /*hash the password using bcrypt to keep hidden */
  console.log(req.body);
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });

    /*Create token for logging in if user created successfully*/
    user.save()
    .then(result => {
      const token = jwt.sign(
        { email: result.email, userId: result._id },
        'trapping_in_japan_12_is_the_greatest',
        {expiresIn: '1hr'}
      );
      console.log('going well');
      res.status(201).json({
        message: 'User created successfully',
        result: result,
        token: token
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'User could not be created',
        error: err
      });
    });
  });
});

router.post('/login', (req, res, next) => {
  /*Query for user*/
  User.findOne({
    email: req.body.email
  })
  .then(user => {
    /*if not found */
    if (!user){
      return res.status(401).json({ message: 'User not found'});
    }

    return { same: bcrypt.compare(req.body.password, user.password), user: user };
  })
  .then(result => {
    if(!result.same) {
      return res.status(401).json({
        message: 'Authentication failed'
      });
    }

    /*create token for the front end*/
    const token = jwt.sign(
      { email: result.user.email, userId: result.user._id },
      'testing_for_the_home_team',
      {expiresIn: '1h'}
    );

    res.status(200).json({
      token: token,
      message: 'Logged in Successfully'
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Unable to login',
      error: err
    });
  });
});

module.exports = router;
