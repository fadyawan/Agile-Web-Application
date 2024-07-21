const config = require("../config/config");

const Skill = require("./skill");
const SkillCategory = require("./skillCategory");
const SkillLevel = require("./skillLevel");
const SkillAssignment = require("./skillAssignment");
const StaffAssignment = require("./staffAssignment");
const SystemRole = require("./systemRole");
const User = require("./user");



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


db.skillCategory = SkillCategory(sequelize);
db.skill = Skill(sequelize,  db.skillCategory);
db.skillLevel = SkillLevel(sequelize);
db.systemRole = SystemRole(sequelize);
db.user = User(sequelize, db.systemRole);
db.skillAssignment = SkillAssignment(sequelize, db.user, db.skill, db.skillLevel);
db.staffAssignment = StaffAssignment(sequelize, db.user);



module.exports = db;