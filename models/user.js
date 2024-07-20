const { Sequelize } = require("sequelize");

module.exports = (Sequelize, sequelize) => {
    const User = sequelize.define("user",
    {
    firstname: {
        type: Sequelize.STRING,
    },
    surname: {
        type: Sequelize.STRING,
    },
    username: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    job_role: {
        type: Sequelize.STRING,
    },              
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'user'
    }
    );

    User.belongsTo(SystemRole,
        {foreignKey: 'system_role'});


    return SkillCategory;
};