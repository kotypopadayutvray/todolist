'use strict';

// Load modules
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

// variables
var database = {};
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.js')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname).filter(file => {
  return file.indexOf('.') !== 0 && file !== basename && (file.slice(-3) === '.js');
}).forEach(file => {
  let model = sequelize['import'](path.join(__dirname, file));
  database[model.name] = model;
});

Object.keys(database).forEach(modelName => {
  if (database[modelName].associate) {
    database[modelName].associate(database);
  }
});

database.sequelize = sequelize;
database.Sequelize = Sequelize;

module.exports = database;
