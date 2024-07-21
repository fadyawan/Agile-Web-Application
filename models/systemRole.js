module.exports = (sequelize) => {
    const SystemRole = sequelize.define("system_role",
    {
    system_role: {
        type: Sequelize.STRING,
    }         
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'system_role'
    }
    );

    return SystemRole;
};