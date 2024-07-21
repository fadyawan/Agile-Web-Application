module.exports = (sequelize, Sequelize, User) => {
    const SkillAssignment = sequelize.define("SkillAssignment", {
        expiry_date: {
            type: Sequelize.DATE
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'skill_assignment'
    });

    return SkillAssignment;
};

