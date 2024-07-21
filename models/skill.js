module.exports = (sequelize, Sequelize, SkillAssignment) => {
    const Skill = sequelize.define("Skill", {
        description: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'skill'
    });

    Skill.belongsTo(SkillAssignment, { foreignKey: 'skill_id' });

    return Skill;
};
