const { Sequelize, DataTypes } = require('sequelize');
const SkillAssignmentModel = require('../models/skillAssignment');
const StaffModel = require('../models/user');
const SkillModel = require('../models/skill');
const SkillLevelModel = require('../models/skillLevel');

describe('SkillAssignment Model', () => {
    let sequelize;
    let SkillAssignment;
    let Staff;
    let Skill;
    let SkillLevel;

    beforeAll(async () => {
        // Initialize an in-memory SQLite database for testing
        sequelize = new Sequelize('sqlite::memory:', { logging: false });

        // Define models
        SkillAssignment = SkillAssignmentModel(sequelize, DataTypes, Staff, Skill, SkillLevel);
        Staff = StaffModel(sequelize, DataTypes);
        Skill = SkillModel(sequelize, DataTypes);
        SkillLevel = SkillLevelModel(sequelize, DataTypes);

        // Sync models
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        // Close the database connection
        await sequelize.close();
    });

    it('should define the SkillAssignment model correctly', () => {
        expect(SkillAssignment).toBeDefined();
        expect(SkillAssignment.rawAttributes).toHaveProperty('expiry_date');
        expect(SkillAssignment.rawAttributes.expiry_date.type).toBeInstanceOf(DataTypes.DATE);
    });

    it('should have associations with Staff, Skill, and SkillLevel models', () => {
        expect(SkillAssignment.associations.staff).toBeDefined();
        expect(SkillAssignment.associations.skill).toBeDefined();
        expect(SkillAssignment.associations.skillLevel).toBeDefined();
    });
});
