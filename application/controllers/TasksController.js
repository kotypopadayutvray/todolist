const viewPath = '../views/Tasks/';
var viewDataHelper = require('./helpers/ViewData');
var models = require('../models/models');

exports.allTasks = function(request, response) {
  models.Todolist.findByUserId(request.user.id).then(todolists => {
    response.render(viewPath + 'all_tasks',
      Object.assign({},
        viewDataHelper.partialLocals('Your tasks', request),
        { todolists: todolists }
      )
    );
  }).catch(errors => {
    response.render(viewPath + 'all_tasks',
      Object.assign({},
        viewDataHelper.partialLocals('Your tasks', request),
        { errors: errors }
      )
    );
  });
};

exports.task = function(request, response) {
  models.Todolist.findById(request.params.id).then(todolist => {
    response.render(viewPath + 'task', { todolist: todolist });
  }).catch(errors => {
    response.render(viewPath + 'task', { errors: errors });
  });
};
