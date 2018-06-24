const viewPath = '../views/User/';
var viewDataHelper = require('./helpers/ViewData');

exports.signup = function(request, response) {
  response.render(viewPath + 'signup', viewDataHelper.partialLocals('Sign Up', request));
};

exports.signin = function(request, response) {
  response.render(viewPath + 'signin', viewDataHelper.partialLocals('Sign In', request));
};

exports.register = function(request, response) {
  response.redirect('/');
};

exports.login = function(request, response) {
  response.redirect('/');
};

exports.logout = function(request, response) {
  request.session.destroy(function() {
    response.redirect('/');
  });
};
