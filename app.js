var path = require('path');
var User = require('./application/models/models').User;
var config = require('./config/config')[process.env.NODE_ENV];
var logger = require('morgan');
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var sequelize = require('sequelize');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var mainPageRouter = require('./routes/MainPageRouter');
require('./config/passport/passport.js')(passport, User);
var userRouter = require('./routes/UserRouter')(passport);

var app = express();
var dbConnection = sequelize;

// View engine setup
app.set('views', path.join(__dirname, 'application/views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// For passport
// session secret
app.use(session({
  secret: config.passport_secret,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());

// Set router 
app.use('/', mainPageRouter);
app.use('/user/', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  let productionEnv = req.app.get('env') === 'production';
  res.status(err.status || 500);
  // If we are in the production environment
  // Send static files
  if (productionEnv) {
    res.sendFile(path.join(__dirname + '/public/pages/' + err.status + '.html'));
  } else {
    // Render file with error data
    res.locals.error = err;
    res.locals.message = err.message;
    res.render('error');
  }
});

module.exports = app;
