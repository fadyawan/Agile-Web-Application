const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// Import models
const SkillAssignment = require('./SkillAssignment')(sequelize, DataTypes, null);
const StaffAssignment = require('./StaffAssignment')(sequelize, DataTypes, null);
const Skill = require('./Skill')(sequelize, DataTypes, SkillAssignment);
const SkillCategory = require('./SkillCategory')(sequelize, DataTypes, Skill);
const SkillLevel = require('./SkillLevel')(sequelize, DataTypes, SkillAssignment);
const SystemRole = require('./SystemRole')(sequelize, DataTypes, null);
const User = require('./User')(sequelize, DataTypes, StaffAssignment, SkillAssignment);

// Set up associations
Skill.belongsTo(SkillAssignment, { foreignKey: 'skill_id' });
SkillCategory.belongsTo(Skill, { foreignKey: 'skill_category_id' });
SkillLevel.belongsTo(SkillAssignment, { foreignKey: 'skill_level_id' });
SystemRole.belongsTo(User, { foreignKey: 'system_role_id' });

User.belongsTo(StaffAssignment, { as: 'Staff', foreignKey: 'staff_id' });
User.belongsTo(StaffAssignment, { as: 'Manager', foreignKey: 'manager_id' });
User.belongsTo(SkillAssignment, { foreignKey: 'staff_id' });

module.exports = {
  sequelize,
  Sequelize,
  Skill,
  SkillAssignment,
  SkillCategory,
  SkillLevel,
  StaffAssignment,
  SystemRole,
  User
};