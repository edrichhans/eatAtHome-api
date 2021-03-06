'use strict';

var mongoose = require('mongoose'),
  Home = mongoose.model('Homes');

exports.listHomes = function(req, res) {
  Home.find({}, function(err, home) {
    if (err)
      res.status(500).send(err);
    res.status(200).json(home);
  });
};


exports.createHome = function(req, res) {
  if(req.body.users) {
    req.body.users = JSON.parse(req.body.users);
  }
  if (req.body.dinnerTime > 0 && req.body.dinnerTime < 2359 && req.body.askTime > 0 && req.body.askTime < 2359) {
    var newHome = new Home(req.body);
    var users = req.body.users;
    for (var i = 0; i < users.length; i++) {
      Home.findOne({username: users[i].username}).then(existingUser => {
        if (!existingUser) {
          valid = false;
          res.status(500).json({message: 'Some users do not exist'});
          return;
        }
      });
    }
    newHome.save(function(err, home) {
      if (err)
        res.status(500).send(err);
      res.status(200).json(home);
    });
  }
  else {
    res.json({message: 'Invalid parameters set'})
  }
};


exports.getHome = function(req, res) {
  Home.findOne({id: req.params.homeId}, function(err, home) {
    if (err)
      res.status(500).send(err);
    res.status(200).json(home);
  });
};


exports.getDinner = function(req, res) {
  Home.findOne({id: req.params.homeId}, function(err, home) {
    if (err)
      res.status(500).send(err);
    res.status(200).json(home.dinnerTime);
  });
}

exports.getAsk = function(req, res) {
  Home.findOne({id: req.params.homeId}, function(err, home) {
    if (err)
      res.status(500).send(err);
    res.status(200).json(home.askTime);
  });
}


exports.updateHome = function(req, res) {
  if (req.body.dinnerTime > 0 && req.body.dinnerTime < 2359 && req.body.askTime > 0 && req.body.askTime < 2359) {
    Home.findOneAndUpdate({id: req.params.homeId}, req.body, {new: true}, function(err, home) {
      if (err)
        res.status(500).send(err);
      res.status(200).json(home);
    });
  }
  else {
    res.status(500).json({message: 'Invalid parameters set'})
  }
};


exports.deleteHome = function(req, res) {
  Home.remove({
    id: req.params.homeId
  }, function(err, home) {
    if (err)
      res.status(500).send(err);
    res.status(200).json({ message: 'Home successfully deleted' });
  });
};

exports.addUsers = function(req, res) {
  console.log(req.body.users);
  var users = JSON.parse(req.body.users);
  if (Array.isArray(users)) {
    for (var i = 0; i < users.length; i++) {
      pushUser(Home, users[i], req, res);
    }
  }
  else {
    pushUser(Home, users, req, res);
  }
};

function pushUser(Home, user, req, res) {
  Home.findOne({username: user.username}).then(existingUser => {
    if (existingUser) {
      Home.update(
        {id: req.params.homeId},
        {$push: {users: user}}, function(err1, home) {
          if (err1) {
            res.status(500).send(err1);
          }
          else {
            res.status(200).json({message: 'User Added.'})
          }
        }
      );
    }
    else {
      res.status(500).json({message: 'User does not exist'})
    }
  });
}

exports.updateDinner = function(req, res) {
  if (req.body.dinnerTime > 0 && req.body.dinnerTime < 2359) {
    Home.update(
      {id: req.params.homeId},
      {dinnerTime: req.body.dinnerTime}, function(err, home) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.status(200).json({message: 'Dinner Time Updated'})
        }
      }
    )
  }
  else {
    res.json({message: 'Invalid dinner time'})
  }
}

exports.updateAsk = function(req, res) {
  if (req.body.askTime > 0 && req.body.dinnerTime < 2359) {
    Home.update(
      {id: req.params.homeId},
      {dinnerTime: req.body.askTime}, function(err, home) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.status(200).json({message: 'Dinner Time Updated'})
        }
      }
    )
  }
  else {
    res.status(500).json({message: 'Invalid ask time'})
  }
}



