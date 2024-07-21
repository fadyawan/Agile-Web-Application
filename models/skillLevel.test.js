const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../models'); // Adjust the path as necessary

// Define the SkillLevel model
const SkillLevel = sequelize.define('SkillLevel', {
  skill_level: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'skill_level',
});

describe('SkillLevel Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Sync the database
  });

  it('should define the SkillLevel model correctly', () => {
    // Check if the SkillLevel model exists
    expect(SkillLevel).toBeDefined();

    // Verify the attributes
    expect(SkillLevel.rawAttributes).toHaveProperty('skill_level');
    expect(SkillLevel.rawAttributes.skill_level.type).toBeInstanceOf(DataTypes.STRING);

    // Verify tableName and timestamps options
    expect(SkillLevel.options.timestamps).toBe(false);
    expect(SkillLevel.options.freezeTableName).toBe(true);
    expect(SkillLevel.options.tableName).toBe('skill_level');
  });
});
