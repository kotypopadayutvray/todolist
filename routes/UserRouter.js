var express = require('express');
var router = express.Router();

var userController = require('../application/controllers/UserController');

module.exports = function(passport) {
  router.get('/signup', userController.signup);
  router.get('/signin', userController.signin);
  router.post('/signup', function(request, response, next) {
    passport.authenticate('local-signup', function(error, user, info) {
      if (error) {
        console.log('Signup POST. An error occured. Error below:');
        console.log({ error: error });
        return next(error);
      }
      if (!user) {
        return response.redirect('/user/signup');
      }
      console.log({ info: info });
      return response.redirect('/');
    })(request, response, next);
  });
  router.post('/signin', function(request, response, next) {
    passport.authenticate('local-signin', function(error, user, info) {
      if (error) {
        console.log('Signin POST. An error occured. Error below:');
        console.log({ error: error });
        return next(error);
      }
      if (!user) {
        return response.redirect('/user/signin');
      }
      console.log({ info: info });
      request.logIn(user, function(errorLogIn) {
        if (errorLogIn) {
          return next(errorLogIn);
        }
        return response.redirect('/');
      });
    })(request, response, next);
  });
  router.get('/logout', userController.logout);
  return router;
};
