module.exports = (sequelize, Sequelize, User) => {
    const StaffAssignment = sequelize.define("StaffAssignment",
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