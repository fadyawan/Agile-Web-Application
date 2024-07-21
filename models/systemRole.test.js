const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../models'); // Adjust the path as necessary

// Define the SystemRole model
const SystemRole = sequelize.define('SystemRole', {
  system_role: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'system_role'
});

describe('SystemRole Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Sync the database
  });

  it('should define the SystemRole model correctly', () => {
    // Check if the SystemRole model exists
    expect(SystemRole).toBeDefined();

    // Verify the tableName and timestamps options
    expect(SystemRole.options.timestamps).toBe(false);
    expect(SystemRole.options.freezeTableName).toBe(true);
    expect(SystemRole.options.tableName).toBe('system_role');
  });

  it('should have the correct attributes', () => {
    // Verify the attributes of the model
    expect(SystemRole.attributes).toHaveProperty('system_role');
    expect(SystemRole.attributes.system_role.type).toBeInstanceOf(DataTypes.STRING);
  });
});

