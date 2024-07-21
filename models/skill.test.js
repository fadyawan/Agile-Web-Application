// skill.test.js

const SequelizeMock = require('sequelize-mock');
const SkillModelFactory = require('./skill.js');

describe('Skill Model', () => {
    let dbMock;
    let SkillCategoryMock;
    let Skill;

    beforeAll(() => {
        dbMock = new SequelizeMock();
        SkillCategoryMock = dbMock.define('SkillCategory', {
            name: 'Category1'
        });

        Skill = SkillModelFactory(dbMock, dbMock.Sequelize, SkillCategoryMock);
    });

    it('should be defined', () => {
        expect(Skill).toBeDefined();
    });

    it('should have the correct table name', () => {
        expect(Skill.getTableName()).toBe('skill');
    });

    it('should have a description field', () => {
        const attributes = Skill.rawAttributes;
        expect(attributes).toHaveProperty('description');
        expect(attributes.description.type).toBe(dbMock.Sequelize.STRING);
        expect(attributes.description.allowNull).toBe(false);
    });

    it('should belong to SkillCategory', () => {
        expect(Skill.associations).toHaveProperty('SkillCategory');
        expect(Skill.associations.SkillCategory.associationType).toBe('BelongsTo');
        expect(Skill.associations.SkillCategory.foreignKey).toBe('skill_category_id');
    });
});
