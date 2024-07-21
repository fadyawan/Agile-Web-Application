module.exports = (sequelize, SystemRole) => {
    const User = sequelize.define("user",
    {
    firstname: {
        type: sequelize.STRING,
    },
    surname: {
        type: sequelize.STRING,
    },
    username: {
        type: sequelize.STRING,
    },
    password: {
        type: sequelize.STRING,
    },
    job_role: {
        type: sequelize.STRING,
    },              
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'user'
    }
    );

    User.belongsTo(SystemRole,
        {foreignKey: 'system_role_id'});


    return User;
};