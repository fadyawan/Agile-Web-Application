const config = require("../config/config");
const skill = require("./skill");
const skillCategory = require("./skillCategory");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB, 
  config.USER, 
  config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  port: config.PORT
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.skillCategory = skillCategory(sequelize, Sequelize);
db.skill = skill(sequelize, Sequelize, db.skillCategory);

module.exports = db;