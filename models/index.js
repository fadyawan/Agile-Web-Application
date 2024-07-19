const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.skillAssignment = require("./skillAssignment")(sequelize, Sequelize);
db.skill = require("./skill")(sequelize, Sequelize);

module.exports = db;