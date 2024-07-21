module.exports = (sequelize, Sequelize, User, Skill, SkillLevel) => {
    const SkillAssignment = sequelize.define("SkillAssignment", {
        expiry_date: {
            type: Sequelize.DATE
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'skill_assignment'
    });

    SkillAssignment.belongsTo(User, { foreignKey: 'staff_id' });
    SkillAssignment.belongsTo(Skill, { foreignKey: 'skill_id' });
    SkillAssignment.belongsTo(SkillLevel, { foreignKey: 'skill_level_id' });

    return SkillAssignment;
};

