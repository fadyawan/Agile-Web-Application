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

// Define the User model
const User = sequelize.define('User', {
  firstname: {
    type: DataTypes.STRING,
  },
  surname: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  job_role: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'user'
});

// Define associations
User.belongsTo(SystemRole, { foreignKey: 'system_role_id' });

describe('User Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Sync the database
  });

  it('should define the User model correctly', () => {
    // Check if the User model exists
    expect(User).toBeDefined();

    // Verify the tableName and timestamps options
    expect(User.options.timestamps).toBe(false);
    expect(User.options.freezeTableName).toBe(true);
    expect(User.options.tableName).toBe('user');
  });

  it('should have the correct attributes', () => {
    // Verify the attributes of the model
    expect(User.attributes).toHaveProperty('firstname');
    expect(User.attributes.firstname.type).toBeInstanceOf(DataTypes.STRING);

    expect(User.attributes).toHaveProperty('surname');
    expect(User.attributes.surname.type).toBeInstanceOf(DataTypes.STRING);

    expect(User.attributes).toHaveProperty('username');
    expect(User.attributes.username.type).toBeInstanceOf(DataTypes.STRING);

    expect(User.attributes).toHaveProperty('password');
    expect(User.attributes.password.type).toBeInstanceOf(DataTypes.STRING);

    expect(User.attributes).toHaveProperty('job_role');
    expect(User.attributes.job_role.type).toBeInstanceOf(DataTypes.STRING);
  });

  it('should have the correct associations', () => {
    // Verify the associations of the model
    expect(User.associations).toHaveProperty('SystemRole');
    expect(User.associations.SystemRole.associationType).toBe('BelongsTo');
    expect(User.associations.SystemRole.foreignKey).toBe('system_role_id');
  });
});
