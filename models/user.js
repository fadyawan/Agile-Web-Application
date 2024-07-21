module.exports = (sequelize, Sequelize, SkillAssignment, StaffAssignment) => {
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

    User.belongsTo(SkillAssignment,
            {foreignKey: 'staff_id'});
    User.belongsTo(StaffAssignment,
            {foreignKey: 'staff_id', 
            foreignKey: 'manager_id'
            });


    return User;
};