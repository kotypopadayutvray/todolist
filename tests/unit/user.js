var expect = require('expect');

describe('models/user', function () {
  var models = require('../../application/models/models');

  before(function () {
      return models.sequelize.sync({ force: true, logging: false });
  });

  beforeEach(function () {
    this.User = models.User;
  });

  after(() => {
    models.sequelize.close();
  });

  describe('create', function () {
    it('creates a user', function() {
      return this.User.create({ login: 'kotypopadayutvra',
                                email: 'mysuper@email.com',
                                password: '123456'
                              })
                 .then(user => { expect(user.login).toEqual('kotypopadayutvra') });
    });
    it('check login for unique', function() {
      return this.User.create({ login: 'kotypopadayutvra',
                                email: 'mysuper@email.com',
                                password: '123456'
                              })
                 .catch(error => { expect(error.errors[0].type).toEqual('unique violation') && expect(error.errors[0].path).toEqual('login') });
    });
    it('check email for unique', function() {
      return this.User.create({ login: 'kotypopadayutvray',
                                email: 'mysuper@email.com',
                                password: '123456'
                              })
                 .catch(error => { expect(error.errors[0].type).toEqual('unique violation') && expect(error.errors[0].path).toEqual('email') });
    });
    it('check login for length', function() {
      return this.User.create({ login: 'ko',
                                email: 'test@test.com',
                                password: '123456'
                              })
                 .catch(error => { expect(error.errors[0].validatorKey).toEqual('len') && expect(error.errors[0].path).toEqual('login') });
    });
    it('check email for correct', function() {
      return this.User.create({ login: 'kot',
                                email: 'test1231239est.com',
                                password: '123456'
                              })
                 .catch(error => { expect(error.errors[0].validatorKey).toEqual('isEmail') && expect(error.errors[0].path).toEqual('email') });
    });
  });
});
