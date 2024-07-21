const { sequelize, StaffAssignment, User } = require('../models'); // Adjust the path as necessary

describe('StaffAssignment Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Sync the database
  });

  it('should define the StaffAssignment model correctly', () => {
    expect(StaffAssignment).toBeDefined();
    expect(StaffAssignment.options.timestamps).toBe(false);
    expect(StaffAssignment.options.freezeTableName).toBe(true);
    expect(StaffAssignment.options.tableName).toBe('staff_assignment');
  });

  it('should have associations with User model', () => {
    expect(StaffAssignment.associations).toHaveProperty('User');
    expect(StaffAssignment.associations.User.associationType).toBe('BelongsTo');
    expect(StaffAssignment.associations.User.foreignKey).toBe('staff_id');

    expect(StaffAssignment.associations).toHaveProperty('User');
    expect(StaffAssignment.associations.User.associationType).toBe('BelongsTo');
    expect(StaffAssignment.associations.User.foreignKey).toBe('manager_id');
  });
});
