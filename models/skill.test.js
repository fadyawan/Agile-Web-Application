const { Sequelize, DataTypes } = require('sequelize');
const { sequelize, Skill, SkillCategory } = require('../models'); // Adjust the path as necessary

describe('Skill Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Sync the database
  });

  it('should define the Skill model correctly', () => {
    // Check if the Skill model exists
    expect(Skill).toBeDefined();

    // Verify the attributes
    expect(Skill.rawAttributes).toHaveProperty('description');
    expect(Skill.rawAttributes.description.type).toBeInstanceOf(DataTypes.STRING);
    expect(Skill.rawAttributes.description.allowNull).toBe(false);

    // Verify tableName and timestamps options
    expect(Skill.options.timestamps).toBe(false);
    expect(Skill.options.freezeTableName).toBe(true);
    expect(Skill.options.tableName).toBe('skill');
  });

  it('should have a belongsTo association with SkillCategory', () => {
    // Check the associations
    expect(Skill.associations.skill_category_id).toBeDefined();
    expect(Skill.associations.skill_category_id.associationType).toBe('BelongsTo');
    expect(Skill.associations.skill_category_id.target).toBe(SkillCategory);
  });
});