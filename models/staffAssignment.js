const { Sequelize } = require("sequelize");

module.exports = (Sequelize, Sequelize) => {
    const StaffAssignment = sequelize.define("staff_assignment",
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'staff_assignment'
    }
    );

    StaffAssignment.belongsTo(User,
        {foreignKey: 'staff_id'});
    StaffAssignment.belongsTo(User,
        {foreignKey: 'manager_id'});


    return StaffAssignment;
};