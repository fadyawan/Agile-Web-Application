const { Sequelize } = require("sequelize");

module.exports = (Sequelize, sequelize) => {
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

    SkillCategory.belongsTo(User,
        {foreignKey: 'system_role_id'});



    return SkillCategory;
};