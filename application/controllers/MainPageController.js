const viewPath = '../views/MainPage/';
var viewDataHelper = require('./helpers/ViewData');

exports.index = function(request, response) {
  response.render(viewPath + 'index', viewDataHelper.partialLocals('Express', request));
};
