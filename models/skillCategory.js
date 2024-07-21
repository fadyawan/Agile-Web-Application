module.exports = (sequelize) => {
    const SkillCategory = sequelize.define("skill_category",
    {
    description: {
        type: sequelize.STRING,
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