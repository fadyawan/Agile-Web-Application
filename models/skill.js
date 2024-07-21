module.exports = (sequelize, Sequelize, SkillCategory) => {
    const Skill = sequelize.define("skill", {
        description: {
            type: Sequelize.STRING,
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
