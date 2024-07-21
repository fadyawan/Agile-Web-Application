// skillCategory.test.js

const SequelizeMock = require('sequelize-mock');
const SkillCategoryModelFactory = require('./skillCategory.js'); // Update the path as necessary

describe('SkillCategory Model', () => {
    let dbMock;
    let SkillCategory;

    beforeAll(() => {
        dbMock = new SequelizeMock();
        SkillCategory = SkillCategoryModelFactory(dbMock, dbMock.Sequelize);
    });

    it('should be defined', () => {
        expect(SkillCategory).toBeDefined();
    });

    it('should have the correct table name', () => {
        expect(SkillCategory.getTableName()).toBe('skill_category');
    });

    it('should have a description field', () => {
        const attributes = SkillCategory.rawAttributes;
        expect(attributes).toHaveProperty('description');
        expect(attributes.description.type).toBe(dbMock.Sequelize.STRING);
    });

    it('should not have timestamps', () => {
        expect(SkillCategory.options.timestamps).toBe(false);
    });

    it('should freeze table name', () => {
        expect(SkillCategory.options.freezeTableName).toBe(true);
    });
});
