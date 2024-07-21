module.exports = (sequelize, Sequelize, SkillAssignment) => {
    const SkillLevel = sequelize.define("skill_level",
    {
    skill_level: {
        type: Sequelize.STRING,
    }         
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'skill_level'
    }
    );

    SkillLevel.belongsTo(SkillAssignment,
      {foreignKey: 'skill_level_id'});

    return SkillLevel;
};