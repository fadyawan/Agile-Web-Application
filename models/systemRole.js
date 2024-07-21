module.exports = (sequelize, Sequelize, User) => {
  const SystemRole = sequelize.define("SystemRole", {
      system_role: {
          type: Sequelize.STRING,
          allowNull: false
      }
  }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'system_role'
  });

  SystemRole.belongsTo(User, { foreignKey: 'system_role_id' });

  return SystemRole;
};
