'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    login: {
      type: DataTypes.STRING(50),
      unique: 'login',
      validate: {
        len: [3, 50]
      }
    },
    password: { 
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: 'email',
      validate: {
        isEmail: true
      }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
    indexes: [
      {
        unique: true,
        fields: ['login']
      },
      {
        unique: true,
        fields: ['email']
      }
    ]
  });
  User.associate = function(models) {
    // associations can be defined here
    models.User.hasMany(models.Todolist);
  };
  return User;
};
