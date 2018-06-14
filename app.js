var path = require('path');
var logger = require('morgan');
var express = require('express');
var sequelize = require('sequelize');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var mainPageRouter = require('./routes/MainPage');

var app = express();
var dbConnection = sequelize

// view engine setup
app.set('views', path.join(__dirname, 'application/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set router 
app.use('/', mainPageRouter);

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
