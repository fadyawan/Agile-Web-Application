module.exports = (sequelize, Sequelize, User) => {
    const StaffAssignment = sequelize.define("staff_assignment", {}, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'staff_assignment'
    });

    return StaffAssignment;
};
