const { Sequelize } = require("sequelize");

module.exports = (Sequelize, Sequelize) => {
    const SkillCategory = sequelize.define("skill_category",
    {
    description: {
        type: Sequelize.STRING,
    }         
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'skill_category'
    }
    );



    return SkillCategory;
};