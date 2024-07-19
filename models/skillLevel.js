const { Sequelize } = require("sequelize");

module.exports = (Sequelize, Sequelize) => {
    const SkillLevel = sequelize.define("skill_level",
    {
    skill_level: {
        type: Sequelize.STRING,
    }         
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'system_role'
    }
    );

    SkillLevel.belongsTo(SkillAssignment,
        {foreignKey: 'skill_level_id'});

 

    return SkillCategory;
};