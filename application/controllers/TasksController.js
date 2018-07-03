const viewPath = '../views/Tasks/';
var viewDataHelper = require('./helpers/ViewData');
var models = require('../models/models');

exports.todolists = function(request, response) {
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

exports.todolist = function(request, response) {
  models.Todolist.findById(request.params.id).then(todolist => {
    todolist.getTasks().then(tasks => {
      response.render(viewPath + 'todolist', { todolist: todolist,
        tasks: tasks
      });
    }).catch(errors => {
      console.log('Get todolist\'s task error. Info: ', errors);
      response.render(viewPath + '../error.ejs', { errors: errors });
    });
  }).catch(errors => {
    console.log('Get todolist error. Info: ', errors);
    response.render(viewPath + '../error.ejs', { errors: errors });
  });
};

exports.createTodolist = function(request, response) {
  let todolistData = {
    name: request.body.name,
    end_time: request.body.end_time,
    UserId: request.user.id
  };
  models.Todolist.create(todolistData).then(todolist => {
    response.redirect('/tasks/todolist/' + todolist.id);
  }).catch(errors => {
    console.log('Get todolist error. Info: ', errors);
    response.render(viewPath + '../error.ejs', { errors: errors });
  });
};

exports.updateTodolist = function(request, response) {
  models.Todolist.findById(request.params.id).then(todolist => {
    todolist.name = request.params.name;
    todolist.end_time = request.params.name;
    todolist.save().then(() => {
      response.redirect('/tasks/todolist/' + todolist.id);
    }).catch(errors => {
      console.log('Save todolist error. Info: ', errors);
      response.render(viewPath + '../error.ejs', { errors: errors });
    });
  }).catch(errors => {
    console.log('Get todolist error. Info: ', errors);
    response.render(viewPath + '../error.ejs', { errors: errors });
  });
};

exports.deleteTodolist = function(request, response) {
  models.Todolist.findById(request.params.id).then(todolist => {
    todolist.destroy();
    response.redirect('/tasks/todolists/');
  }).catch(errors => {
    console.log('Get todolist error. Info: ', errors);
    response.render(viewPath + '../error.ejs', { errors: errors });
  });
};
