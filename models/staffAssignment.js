module.exports = (sequelize, Sequelize) => {
    const StaffAssignment = sequelize.define("staff_assignment",
    {},
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'staff_assignment'
    }
    );

    return StaffAssignment;
};