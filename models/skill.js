module.exports = (sequelize, SkillCategory) => {
    const Skill = sequelize.define("Skill", {
        description: {
            type: sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'skill'
    });

    Skill.belongsTo(SkillCategory,
        {foreignKey: 'skill_category_id'});

    return Skill;
};
