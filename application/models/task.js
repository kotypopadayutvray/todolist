'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    status: DataTypes.BOOLEAN
  }, {
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ]
  });
  Task.associate = function(models) {
    // associations can be defined here
    models.Task.belongsTo(models.Todolist, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Task;
};