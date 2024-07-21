module.exports = (sequelize, Sequelize, SkillAssignment) => {
  const SkillLevel = sequelize.define("SkillLevel", {
      skill_level: {
          type: Sequelize.STRING,
          allowNull: false
      }
  }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'skill_level'
  });

  SkillLevel.belongsTo(SkillAssignment, { foreignKey: 'skill_level_id' });

  return SkillLevel;
};
