const { Sequelize, DataTypes } = require('sequelize');
const SkillAssignmentModel = require('../models/skillAssignment');
const SkillLevelModel = require('../models/skillLevel');

describe('SkillAssignment Model', () => {
    let sequelize;
    let SkillAssignment;
    let SkillLevel;

    beforeAll(async () => {
        // Initialize an in-memory SQLite database for testing
        sequelize = new Sequelize('sqlite::memory:', { logging: false });

        // Define models
        Skill = SkillModel(sequelize, DataTypes);
        SkillLevel = SkillLevelModel(sequelize, DataTypes);
        SkillAssignment = SkillAssignmentModel(sequelize, DataTypes, User, Skill, SkillLevel);

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

    it('should have associations with User, Skill, and SkillLevel models', () => {
        expect(SkillAssignment.associations.skillLevel).toBeDefined();
    });
});
