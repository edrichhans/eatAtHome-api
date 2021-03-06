'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('Users');

exports.listUsers = function(req, res) {
  User.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.createUser = function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
};


exports.getUser = function(req, res) {
  User.findOne({username: req.params.username}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.updateUser = function(req, res) {
    User.findOneAndUpdate({username: req.params.username}, req.body, {new: true}, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
};


exports.deleteUser = function(req, res) {
  User.remove({
    username: req.params.username
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};


