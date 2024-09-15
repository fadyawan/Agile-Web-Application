module.exports = (sequelize, Sequelize, User) => {
    const StaffAssignment = sequelize.define("staff_assignment",
    {},
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'staff_assignment'
    }
    );

    StaffAssignment.belongsTo(User,{
      foreignKey: {
          field: 'staff_id',
          allowNull: false
      },
      as: 'staffId',
  });

  StaffAssignment.belongsTo(User,{
    foreignKey: {
        field: 'manager_id',
        allowNull: false
    },
    as: 'managerId',
});

    return StaffAssignment;
};