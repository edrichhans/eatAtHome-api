'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: 'Please enter username',
    unique: true
  },
  name: {
    type: String,
    required: 'Please enter name'
  },
  email: {
    type: String,
    required: 'Please enter email',
    unique: true
  },
  password: {
    type: String,
    required: 'Please enter password'
  }
});

module.exports = mongoose.model('Users', userSchema);