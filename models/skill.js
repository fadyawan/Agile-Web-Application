const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Skill = sequelize.define("skill", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'skill'
    });

    return Skill;
};
