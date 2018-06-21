// this in functions below gets by binding context

exports.findOrCreateUser = function findOrCreateUser() {
  return this.User.count().then(count => {
    if (!count) {
      return this.User.create({
        login: 'kotypopadayutvray',
        email: 'mysuper@email.com',
        password: '123456'
      });
    } else {
      return this.User.findById(1);
    }
  });
};

exports.findOrCreateTodolist = function findOrCreateTodolist(user) {
  return this.Todolist.count().then(count => {
    if (!count) {
      return this.Todolist.create({
        name: 'My todolist',
        UserId: user.id
      });
    } else {
      return this.Todolist.findById(1);
    }
  });
};
