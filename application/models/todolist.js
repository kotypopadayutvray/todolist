'use strict';

module.exports = (sequelize, DataTypes) => {
  var Todolist = sequelize.define('Todolist', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    end_time: DataTypes.DATE
  }, {
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ]
  });
  Todolist.associate = function(models) {
    // associations can be defined here
    models.Todolist.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Todolist.hasMany(models.Task);
  };
  return Todolist;
};
