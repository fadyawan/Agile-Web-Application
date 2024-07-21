module.exports = (sequelize, Sequelize, StaffAssignment, SkillAssignment) => {
    const User = sequelize.define("user", {
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        job_role: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'user'
    });

    User.belongsTo(StaffAssignment, { as: 'Staff', foreignKey: 'staff_id' });
    User.belongsTo(StaffAssignment, { as: 'Manager', foreignKey: 'manager_id' });
    User.belongsTo(SkillAssignment, { foreignKey: 'staff_id' });

    return User;
};
