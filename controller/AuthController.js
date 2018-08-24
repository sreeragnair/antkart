var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/user");

var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  res.render('indexzz', { user : req.user });
  
};

// Go to registration page
userController.register = function(req, res) {
  res.render('indexzz');
  console.log("registerd success")
};

// Post registration
userController.doRegister = function(req, res) {
    console.log(req.body)
    Users=new User({ username : req.body.username, password: req.body.password });
    console.log(Users)
  User.register(Users, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render('indexzz', { user : user });
    }
 passport.authenticate('local')(req, res, function () {
 res.redirect('/');
    });
  });
};
// Go to login page
userController.login = function(req, res) {
    console.log("Login")
  res.render('indexzz');
};

// Post login
userController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    if(req.user && req.user.role=="admin"){
        res.redirect( "/api/productinfo");
   
  }
    res.redirect("/api/userview");
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = userController;