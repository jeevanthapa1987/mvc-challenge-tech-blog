const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.slice(-3) === '.js')
  .forEach(file => {
    const modelDefiner = require(path.join(__dirname, file));
    if (typeof modelDefiner === 'function') {
      const model = modelDefiner(sequelize, Sequelize.DataTypes);
      console.log(`Model for ${file}:`, model); // Add this line to log the model
      db[model.name] = model;
    } else {
      console.error(`Model definition in ${file} is not a function.`);
    }
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
