const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../models'); // Adjust the path as necessary

// Define the SkillCategory model
const SkillCategory = sequelize.define('SkillCategory', {
  description: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'skill_category',
});

describe('SkillCategory Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Sync the database
  });

  it('should define the SkillCategory model correctly', () => {
    // Check if the SkillCategory model exists
    expect(SkillCategory).toBeDefined();

    // Verify the attributes
    expect(SkillCategory.rawAttributes).toHaveProperty('description');
    expect(SkillCategory.rawAttributes.description.type).toBeInstanceOf(DataTypes.STRING);

    // Verify tableName and timestamps options
    expect(SkillCategory.options.timestamps).toBe(false);
    expect(SkillCategory.options.freezeTableName).toBe(true);
    expect(SkillCategory.options.tableName).toBe('skill_category');
  });
});
