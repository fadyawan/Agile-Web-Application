module.exports = (sequelize, Sequelize, User) => {
    const StaffAssignment = sequelize.define("StaffAssignment", {}, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'staff_assignment'
    });

    return StaffAssignment;
};
