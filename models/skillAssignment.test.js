const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../models'); // Adjust the path as necessary

// Define the Staff, Skill, and SkillLevel models for testing
const Staff = sequelize.define('Staff', {}, { timestamps: false });
const Skill = sequelize.define('Skill', {}, { timestamps: false });
const SkillLevel = sequelize.define('SkillLevel', {}, { timestamps: false });

// Define the SkillAssignment model
const SkillAssignment = sequelize.define('SkillAssignment', {
  expiry_date: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'skill_assignment',
});

// Define associations
SkillAssignment.belongsTo(Staff, { foreignKey: 'staff_id' });
SkillAssignment.belongsTo(Skill, { foreignKey: 'skill_id' });
SkillAssignment.belongsTo(SkillLevel, { foreignKey: 'skill_level_id' });

describe('SkillAssignment Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Sync the database
  });

  it('should define the SkillAssignment model correctly', () => {
    // Check if the SkillAssignment model exists
    expect(SkillAssignment).toBeDefined();

    // Verify the attributes
    expect(SkillAssignment.rawAttributes).toHaveProperty('expiry_date');
    expect(SkillAssignment.rawAttributes.expiry_date.type).toBeInstanceOf(DataTypes.DATE);

    // Verify tableName and timestamps options
    expect(SkillAssignment.options.timestamps).toBe(false);
    expect(SkillAssignment.options.freezeTableName).toBe(true);
    expect(SkillAssignment.options.tableName).toBe('skill_assignment');
  });

  it('should have belongsTo associations with Staff, Skill, and SkillLevel', () => {
    // Check the associations
    const associations = SkillAssignment.associations;
    
    expect(associations.staff_id).toBeDefined();
    expect(associations.staff_id.associationType).toBe('BelongsTo');
    expect(associations.staff_id.target).toBe(Staff);

    expect(associations.skill_id).toBeDefined();
    expect(associations.skill_id.associationType).toBe('BelongsTo');
    expect(associations.skill_id.target).toBe(Skill);

    expect(associations.skill_level_id).toBeDefined();
    expect(associations.skill_level_id.associationType).toBe('BelongsTo');
    expect(associations.skill_level_id.target).toBe(SkillLevel);
  });
});

