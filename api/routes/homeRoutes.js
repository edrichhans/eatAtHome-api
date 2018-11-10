'use strict';
module.exports = function(app) {
  var home = require('../controllers/homeController');

  // todoList Routes
  app.route('/homes')
    .get(home.listHomes)

  app.route('/addhome')
    .post(home.createHome);

  app.route('/homes/:homeId')
    .get(home.getHome)
    .put(home.updateHome)
    .delete(home.deleteHome);

  app.route('/homes/:homeId/users')
    .post(home.addUsers)

  app.route('/homes/:homeId/dinner')
    .get(home.getDinner)
    .post(home.updateDinner)

  app.route('/homes/:homeId/ask')
    .get(home.getAsk)
    .post(home.updateAsk)
};