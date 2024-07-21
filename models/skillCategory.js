module.exports = (sequelize, Sequelize) => {
    const SkillCategory = sequelize.define("SkillCategory",
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