const viewPath = '../views/MainPage/';

exports.index = function(request, response){
  response.render(viewPath + 'index', { title: 'Express' });
};
