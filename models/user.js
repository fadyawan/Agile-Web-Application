const { Sequelize } = require("sequelize");

module.exports = (Sequelize, Sequelize) => {
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
      tableName: 'system_role'
    }
    );
    User.belongsTo(StaffAssignment,
        {foreignKey: 'staff_id'});
    User.belongsTo(StaffAssignment,
        {foreignKey: 'manager_id'});
    User.belongsTo(SystemRole,
        {foreignKey: 'system_role'});
    User.belongsTo(SkillAssignment,
        {foreignKey: 'staff_id'});

    return SkillCategory;
};