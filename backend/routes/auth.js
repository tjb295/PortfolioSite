/*Routing for Authorization, login*/
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../models/user');

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
