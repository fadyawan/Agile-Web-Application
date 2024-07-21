module.exports = (sequelize, Sequelize) => {
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

  return SkillLevel;
};
