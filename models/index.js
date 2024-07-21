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

db.skillAssignment = SkillAssignment(sequelize, Sequelize);
db.staffAssignment = StaffAssignment(sequelize, Sequelize);
db.skill = Skill(sequelize, Sequelize, db.skillAssignment);
db.skillCategory = SkillCategory(sequelize, Sequelize, db.skill);
db.skillLevel = SkillLevel(sequelize, Sequelize, db.skillAssignment );
db.user = User(sequelize, Sequelize, db.skillAssignment, db.staffAssignment);
db.systemRole = SystemRole(sequelize, Sequelize, db.user );



module.exports = db;