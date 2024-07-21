// skillLevel.test.js

const SequelizeMock = require('sequelize-mock');
const SkillLevelModelFactory = require('./skillLevel.js'); // Update the path as necessary

describe('SkillLevel Model', () => {
    let dbMock;
    let SkillLevel;

    beforeAll(() => {
        dbMock = new SequelizeMock();
        SkillLevel = SkillLevelModelFactory(dbMock, dbMock.Sequelize);
    });

    it('should be defined', () => {
        expect(SkillLevel).toBeDefined();
    });

    it('should have the correct table name', () => {
        expect(SkillLevel.getTableName()).toBe('skill_level');
    });

    it('should have a skill_level field', () => {
        const attributes = SkillLevel.rawAttributes;
        expect(attributes).toHaveProperty('skill_level');
        expect(attributes.skill_level.type).toBe(dbMock.Sequelize.STRING);
    });

    it('should not have timestamps', () => {
        expect(SkillLevel.options.timestamps).toBe(false);
    });

    it('should freeze table name', () => {
        expect(SkillLevel.options.freezeTableName).toBe(true);
    });
});
