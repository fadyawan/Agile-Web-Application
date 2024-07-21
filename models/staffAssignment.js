module.exports = (sequelize, Sequelize, User) => {
    const StaffAssignment = sequelize.define("staff_assignment",
    {},
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'staff_assignment'
    }
    );

    StaffAssignment.belongsTo(User,
        {foreignKey: 'staff_id', 
         foreignKey: 'manager_id'
        });

    return StaffAssignment;
};