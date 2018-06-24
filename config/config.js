module.exports = {
  development: {
    host: '127.0.0.1',
    dialect: 'mysql',
    username: 'todolist',
    password: 'qweRTY12',
    database: 'todolist',
    passport_secret: 'Passport.js secret',
    operatorsAliases: false
  },
  test: {
    host: '127.0.0.1',
    dialect: 'mysql',
    username: 'todolist',
    password: 'qweRTY12',
    database: 'test_todolist',
    logging: false
  }
};
