var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

mongoose.Promise = global.Promise;
var bodyParser = require('body-parser');
var ds = require('./ordersdb.js');

var db = require('./database.js');
var dbs = require('./catdb.js');

var methodOverride = require('method-override');



var api = require('./routes/api');
var routes = require('./routes/index');
var users = require('./routes/users');

var indexRouter = require('./routes/index');
//var cartRouter=require('./routes/cart');
var adminRouter=require('./routes/api');
var userRouter=require('./routes/api');




var swig = require('swig');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.use(favicon());
app.use(logger('dev'));
app.use(methodOverride('_method'))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
    secret: 'keyboardddd cat',
    resave: false,
    saveUninitialized: false
  }));
  

  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/user', isAuthenticated,userRouter);
  app.use('/admin',isAdminAuthenticated,adminRouter);
  app.use('/api/productinfo',isAdminAuthenticated,adminRouter);
  
  app.use('/api/adminprolist',isAdminAuthenticated,adminRouter);
  app.use('/api/admincatlist',isAdminAuthenticated,adminRouter);
 
  app.use('/api/adminorderlist',isAdminAuthenticated,adminRouter);


//modify 
  //app.use('/api/product/',isAdminAuthenticated,adminRouter);

  app.use('/api/userview',isAuthenticated,userRouter);

app.use('/', routes);
app.use('/api', api);


app.use('/users', users);

function isAuthenticated(req, res, next) {
  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if (req.user)
      return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/');
}

function isAdminAuthenticated(req, res, next) {
  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if (req.user && req.user.role=="admin")
      return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/');
}





//app.use('/users', usersRouter);
var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());








/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
