'use strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  User = require("../models/User.model")

exports.register = function(req, res) {
console.log(req);
var newUser = new User(req.body);
newUser.hash_password = bcrypt.hashSync(req.body.password, 10);

newUser.save()
    .then(user => {
    user.hash_password = undefined; // Ensure the hashed password is not sent back
    return res.json(user);
    })
    .catch(err => {
    return res.status(400).send({
        message: err
    });
    });
};

exports.sign_in = async function(req, res) {
try {
    console.log("It's here")
    const user = await User.findOne({ email: req.body.email });
    if (!user || !user.comparePassword(req.body.password)) {
    return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
} catch (err) {
    res.status(500).json({ message: 'Internal server error' });
}
};

exports.loginRequired = function(req, res, next) {
    try {
      if (req.user) {
        next();
      } else {
        return res.status(401).json({ message: 'Unauthorized user!!' });
      }
    } catch (err) {
      // Handle any unexpected errors
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
exports.profile = function(req, res, next) {
try {
    if (req.user) {
    res.send(req.user);
    next();
    } else {
    return res.status(401).json({ message: 'Invalid token' });
    }
} catch (err) {
    // Handle any unexpected errors
    res.status(500).json({ message: 'Internal server error' });
}
};