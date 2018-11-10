'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HomeSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter home name'
  },
  id: {
    type: String,
    required: 'Please enter home ID',
    unique: true
  },
  users: [{
    username: String,
    active: Boolean
  }],
  chatGroup: {
    type: Map,
    of: String
  },
  dinnerTime: {
    type: Number,
    required: 'Please enter dinner time'
  },
  askTime: {
    type: Number,
    required: 'Please enter ask time'
  }
});

module.exports = mongoose.model('Homes', HomeSchema);