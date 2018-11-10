var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  Home = require('./api/models/homeModel'),
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser');

// var path = require('path');
// var mongodb = require('mongodb');
// var ObjectID = mongodb.ObjectID;
// var db;

var env = process.env.NODE_ENV || 'dev'
console.log(env);

// mongoose instance connection url connection
mongoose.Promise = global.Promise;

if (env == 'dev') {
    mongoose.connect('mongodb://localhost/Tododb');
}
else {
    mongoose.connect(process.env.MONGODB_URI, (err) => {
        if (err) {
            console.log('Mongoose connection problem: ' + err);
        }
        else {
            console.log('The Mongoose connection is ready.');
        }
    });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var todoListRoutes = require('./api/routes/todoListRoutes'); //importing route
todoListRoutes(app); //register the route

var homeRoutes = require('./api/routes/homeRoutes'); //importing route
homeRoutes(app); //register the route

var userRoutes = require('./api/routes/userRoutes'); //importing route
userRoutes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);