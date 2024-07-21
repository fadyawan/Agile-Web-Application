module.exports = (sequelize) => {
    const SkillLevel = sequelize.define("skill_level",
    {
    skill_level: {
        type: sequelize.STRING,
    }         
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'skill_level'
    }
    );

    return SkillLevel;
};