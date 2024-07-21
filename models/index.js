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
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.SkillCategory = SkillCategory(sequelize, Sequelize);
db.Skill = Skill(sequelize, Sequelize, db.SkillCategory);
db.SkillLevel = SkillLevel(sequelize, Sequelize);
db.SystemRole = SystemRole(sequelize, Sequelize);
db.User = User(sequelize, Sequelize, db.SystemRole);
db.SkillAssignment = SkillAssignment(sequelize, Sequelize, db.User, db.Skill, db.SkillLevel);
db.StaffAssignment = StaffAssignment(sequelize, Sequelize, db.User);

// Define associations
db.User.hasMany(db.SkillAssignment, { foreignKey: 'staff_id' });
db.Skill.hasMany(db.SkillAssignment, { foreignKey: 'skill_id' });
db.SkillLevel.hasMany(db.SkillAssignment, { foreignKey: 'skill_level_id' });

db.User.hasMany(db.StaffAssignment, { foreignKey: 'staff_id', as: 'StaffAssignments' });
db.User.hasMany(db.StaffAssignment, { foreignKey: 'manager_id', as: 'ManagerAssignments' });

module.exports = db;
