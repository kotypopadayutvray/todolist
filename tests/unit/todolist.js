var expect = require('expect');

describe('models/todolist', function () {
  var models = require('../../application/models/models');
  var helperMethods = require('./helper_methods.js');

  before(function () {
    this.User = models.User;
    this.Todolist = models.Todolist;
    return models.sequelize.sync({ force: true, logging: false });
  });

  beforeEach(function() {
    let _this = this;
    let creatingUser = helperMethods.findOrCreateUser.bind(this);
    return Promise.resolve(creatingUser()).then(user => {
      _this.userDb = user;
    });
  });

  after(() => {
    models.sequelize.close();
  });

  describe('create', function () {
    it('creates a todolist', function() {
      return this.Todolist.create({
        name: 'Test',
        end_time: null,
        UserId: this.userDb.id
      }).then(todolist => {
        expect(todolist.name).toEqual('Test');
      });
    });
  });

  describe('count', function() {
    it('count of todolists should be 1', function() {
      return this.Todolist.count().then(count => {
        expect(count).toEqual(1)
      });
    });
  });

  describe('associations', function() {
    it('find a todolist through user', function() {
      return this.userDb.getTodolists().then(todolists => {
        expect(todolists.length).toEqual(1) && expect(todolists[0].name).toEqual('Test');
      });
    });

    it('find a user through todolist', function() {
      return this.Todolist.findById(1).then(todolist => {
        todolist.getUser().then(user => {
          expect(user.login).toEqual('kotypopadayutvray');
        });
      });
    });
  });
});
