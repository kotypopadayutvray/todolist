// This test should be called with mocha option --exit
// src: https://stackoverflow.com/questions/47970050/node-js-mocha-sequelize-error-connectionmanager-getconnection-was-called-after-t

var expect = require('expect');

describe('models/task', function () {
  var models = require('../../application/models/models');
  var helperMethods = require('./helper_methods');

  before(function () {
    this.User = models.User;
    this.Task = models.Task;
    this.Todolist = models.Todolist;
    return models.sequelize.sync({ force: true, logging: false });
  });

  beforeEach(function() {
    let _this = this;
    let creatingUser = helperMethods.findOrCreateUser.bind(this);
    let creatingTodolist = helperMethods.findOrCreateTodolist.bind(this);
    return Promise.resolve(creatingUser()).then(user => {
      _this.userDb = user;
      return Promise.resolve(creatingTodolist(user)).then(todolist => {
        _this.todolistDb = todolist;
      });
    });
  });

  describe('create', function() {
    it('creates a task', function() {
      this.Task.create({
        name: 'Task 1',
        TodolistId: this.todolistDb.id
      }).then(task => {
        expect(task.name).toEqual('Task 1');
      });
    });

    it('creates a task', function() {
      this.Task.create({
        name: 'Task 2',
        TodolistId: this.todolistDb.id
      }).then(task => {
        expect(task.name).toEqual('Task 2');
      });
    });

    it('creates a task', function() {
      this.Task.create({
        name: 'Task 3',
        TodolistId: this.todolistDb.id
      }).then(task => {
        expect(task.name).toEqual('Task 3');
      });
    });

    it('creates a task', function() {
      this.Task.create({
        name: 'Task 4',
        TodolistId: this.todolistDb.id
      }).then(task => {
        expect(task.name).toEqual('Task 4');
      });
    });
  });

  describe('count', function() {
    it('count of task should be 4', function() {
      this.Task.count().then(count => {
        expect(count).toEqual(4);
      });
    });
  });

  describe('associations', function() {
    it('finds a todolist by association', function() {
      this.Task.findById(1).then(task => {
        task.getTodolist().then(todolist => {
          expect(todolist.name).toEqual('My todolist');
        });
      });
    });

    it('finds a user by association', function() {
      this.Task.findById(1).then(task => {
        task.getTodolist().then(todolist => {
          todolist.getUser().then(user => {
            expect(user.login).toEqual('kotypopadayutvray');
          });
        });
      });
    });
  });
});
