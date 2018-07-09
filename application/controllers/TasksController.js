const viewPath = '../views/Tasks/';
var viewDataHelper = require('./helpers/ViewData');
var models = require('../models/models');

exports.todolists = function(request, response) {
  models.Todolist.findAll({
    where: { 
      UserId: request.user.id
    }
  }).then(todolists => {
    response.render(viewPath + 'todolists',
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
      response.render(viewPath + 'todolist',
        Object.assign({},
          viewDataHelper.partialLocals('Task: ' + todolist.name, request),
          {
            todolist: todolist,
            tasks: tasks
          }
        )
      );
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
    response.render(viewPath + '_todolist.ejs', { todolist: todolist });
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

exports.createTask = function(request, response) {
  let taskData = {
    name: request.body.name,
    description: request.body.description,
    status: request.body.status * 1,
    TodolistId: request.body.id
  };
  models.Task.create(taskData).then((task) => {
    response.render(viewPath + '_task.ejs', { task: task });
  }).catch(errors => {
    console.log('Create task error. Info: ', errors);
    response.render(viewPath + '../error.ejs', { errors: errors });
  });
};

exports.updateTask = function(request, response) {
  models.Task.findById(request.params.id).then(task => {
    task.name = request.params.name;
    task.description = request.params.description;
    task.status = request.params.status;
    task.save().then(() => {
      response.redirect('/tasks/todolist/' + task.TodolistId);
    }).catch(errors => {
      console.log('Save task error. Info: ', errors);
      response.render(viewPath + '../error.ejs', { errors: errors });
    });
  }).catch(errors => {
    console.log('Update task error. Info: ', errors);
    response.render(viewPath + '../error.ejs', { errors: errors });
  });
};

exports.deleteTask = function(request, response) {
  models.Task.findById(request.params.id).then(task => {
    task.destroy();
    response.redirect('/tasks/todolist/' + task.id);
  }).catch(errors => {
    console.log('Get task error. Info: ', errors);
    response.render(viewPath + '../error.ejs', { errors: errors });
  });
};
