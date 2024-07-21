// skillAssignment.test.js

const SequelizeMock = require('sequelize-mock');
const SkillAssignmentModelFactory = require('./skillAssignment.js'); // Update the path as necessary

describe('SkillAssignment Model', () => {
    let dbMock;
    let StaffMock;
    let SkillMock;
    let SkillLevelMock;
    let SkillAssignment;

    beforeAll(() => {
        dbMock = new SequelizeMock();
        StaffMock = dbMock.define('Staff', {
            name: 'John Doe'
        });
        SkillMock = dbMock.define('Skill', {
            description: 'JavaScript'
        });
        SkillLevelMock = dbMock.define('SkillLevel', {
            level: 'Expert'
        });

        SkillAssignment = SkillAssignmentModelFactory(dbMock, dbMock.Sequelize, StaffMock, SkillMock, SkillLevelMock);
    });

    it('should be defined', () => {
        expect(SkillAssignment).toBeDefined();
    });

    it('should have the correct table name', () => {
        expect(SkillAssignment.getTableName()).toBe('skill_assignment');
    });

    it('should have an expiry_date field', () => {
        const attributes = SkillAssignment.rawAttributes;
        expect(attributes).toHaveProperty('expiry_date');
        expect(attributes.expiry_date.type).toBe(dbMock.Sequelize.DATE);
    });

    it('should belong to Staff', () => {
        expect(SkillAssignment.associations).toHaveProperty('Staff');
        expect(SkillAssignment.associations.Staff.associationType).toBe('BelongsTo');
        expect(SkillAssignment.associations.Staff.foreignKey).toBe('staff_id');
    });

    it('should belong to Skill', () => {
        expect(SkillAssignment.associations).toHaveProperty('Skill');
        expect(SkillAssignment.associations.Skill.associationType).toBe('BelongsTo');
        expect(SkillAssignment.associations.Skill.foreignKey).toBe('skill_id');
    });

    it('should belong to SkillLevel', () => {
        expect(SkillAssignment.associations).toHaveProperty('SkillLevel');
        expect(SkillAssignment.associations.SkillLevel.associationType).toBe('BelongsTo');
        expect(SkillAssignment.associations.SkillLevel.foreignKey).toBe('skill_level_id');
    });
});
