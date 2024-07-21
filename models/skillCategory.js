module.exports = (sequelize, Sequelize, Skill) => {
  const SkillCategory = sequelize.define("SkillCategory", {
      description: {
          type: Sequelize.STRING,
      }
  }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'skill_category'
  });

  SkillCategory.belongsTo(Skill, { foreignKey: 'skill_category_id' });

  return SkillCategory;
};
