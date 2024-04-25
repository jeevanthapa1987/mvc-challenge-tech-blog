const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.User = require('../models/user')(sequelize, Sequelize);
db.Post = require('../models/post')(sequelize, Sequelize);

// Associations
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

module.exports = db;
