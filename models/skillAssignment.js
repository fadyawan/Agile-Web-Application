module.exports = (sequelize, Staff, Skill, SkillLevel) => {
    const SkillAssignment = sequelize.define("skill_assignment",
    {
    expiry_date: {
        type: sequelize.DATE
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
