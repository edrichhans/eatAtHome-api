'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');

  // todoList Routes
  app.route('/users')
    .get(user.listUsers)

  app.route('/adduser')
    .post(user.createUser);

  app.route('/users/:username')
    .get(user.getUser)
    .put(user.updateUser)
    .delete(user.deleteUser);

};