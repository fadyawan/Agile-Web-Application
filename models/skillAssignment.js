const { Sequelize } = require("sequelize");

module.exports = (Sequelize, Sequelize) => {
    const SkillAssignment = sequelize.define("skill_assignment",
    {
    expiry_date: {
        type: Sequelize.DATE
    }         
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'skill_assignment'
    }
    );

    SkillAssignment.belongsTo(Staff,
        {foreignKey: 'staff_id'});

    SkillAssignment.belongsTo(Skill,
        {foreignKey: 'skill_id'});

    SkillAssignment.belongsTo(SkillLevel,
        {foreignKey: 'skill_level_id'});



    return SkillAssignment;
};



//id - int - primary key
//staff_id - int - foreign key
//skill_id - int - foreign key
//skill_level_id - int - foreign key
//expiry_Date - date