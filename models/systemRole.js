module.exports = (sequelize, Sequelize) => {
    const SystemRole = sequelize.define("SystemRole",
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