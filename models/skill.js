const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
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
    Skill.belongsTo(SkillAssignment,
        {foreignKey: 'skill_id'});

    return Skill;
};
