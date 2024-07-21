module.exports = (sequelize, Sequelize, SystemRole) => {
    const User = sequelize.define("User", {
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        job_role: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'user'
    });

    User.belongsTo(SystemRole, { foreignKey: 'system_role_id' });

    return User;
};
