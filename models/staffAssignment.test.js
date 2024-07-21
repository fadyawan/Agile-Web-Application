const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../models'); // Adjust the path as necessary

// Define the User model for the purpose of this test
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'user'
});

// Define the StaffAssignment model
const StaffAssignment = sequelize.define('StaffAssignment', {}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'staff_assignment'
});

// Define the associations
StaffAssignment.belongsTo(User, { foreignKey: 'staff_id' });
StaffAssignment.belongsTo(User, { foreignKey: 'manager_id' });

describe('StaffAssignment Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Sync the database
  });

  it('should define the StaffAssignment model correctly', () => {
    // Check if the StaffAssignment model exists
    expect(StaffAssignment).toBeDefined();

    // Verify the tableName and timestamps options
    expect(StaffAssignment.options.timestamps).toBe(false);
    expect(StaffAssignment.options.freezeTableName).toBe(true);
    expect(StaffAssignment.options.tableName).toBe('staff_assignment');
  });

  it('should have associations with User model', () => {
    // Verify associations
    expect(StaffAssignment.associations.staff_id).toBeDefined();
    expect(StaffAssignment.associations.manager_id).toBeDefined();
    expect(StaffAssignment.associations.staff_id.associationType).toBe('BelongsTo');
    expect(StaffAssignment.associations.manager_id.associationType).toBe('BelongsTo');
  });
});

