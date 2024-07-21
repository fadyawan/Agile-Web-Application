// models/skillAssignment.test.js
const { Sequelize, DataTypes } = require('sequelize');
const SkillAssignmentModel = require('./skillAssignment'); // Adjust the path as needed
const StaffModel = require('./staff'); // Adjust the path as needed
const SkillModel = require('./skill'); // Adjust the path as needed
const SkillLevelModel = require('./skillLevel'); // Adjust the path as needed

describe('SkillAssignment Model', () => {
  let sequelize;
  let SkillAssignment;
  let Staff;
  let Skill;
  let SkillLevel;

  beforeAll(async () => {
    // Initialize Sequelize instance
    sequelize = new Sequelize('sqlite::memory:', { logging: false });

    // Define models
    Staff = StaffModel(sequelize, Sequelize);
    Skill = SkillModel(sequelize, Sequelize);
    SkillLevel = SkillLevelModel(sequelize, Sequelize);
    SkillAssignment = SkillAssignmentModel(sequelize, Sequelize, Staff, Skill, SkillLevel);

    // Sync the database
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Close the connection
    await sequelize.close();
  });

  it('should define the SkillAssignment model correctly', () => {
    expect(SkillAssignment).toBeDefined();
    expect(SkillAssignment.tableName).toBe('skill_assignment');
    expect(SkillAssignment.rawAttributes.expiry_date).toBeDefined();
    expect(SkillAssignment.rawAttributes.expiry_date.type).toBeInstanceOf(DataTypes.DATE);
  });

  it('should define associations with Staff, Skill, and SkillLevel models', () => {
    const associations = SkillAssignment.associations;

    expect(associations.staff).toBeDefined();
    expect(associations.staff.associationType).toBe('BelongsTo');
    expect(associations.staff.target.name).toBe('Staff');
    expect(associations.staff.options.foreignKey).toBe('staff_id');

    expect(associations.skill).toBeDefined();
    expect(associations.skill.associationType).toBe('BelongsTo');
    expect(associations.skill.target.name).toBe('Skill');
    expect(associations.skill.options.foreignKey).toBe('skill_id');

    expect(associations.skillLevel).toBeDefined();
    expect(associations.skillLevel.associationType).toBe('BelongsTo');
    expect(associations.skillLevel.target.name).toBe('SkillLevel');
    expect(associations.skillLevel.options.foreignKey).toBe('skill_level_id');
  });

  it('should create a skill assignment and associate it with staff, skill, and skill level', async () => {
    // Create instances of related models
    const staff = await Staff.create({ /* add necessary fields */ });
    const skill = await Skill.create({ description: 'JavaScript' });
    const skillLevel = await SkillLevel.create({ skill_level: 'Intermediate' });

    // Create a skill assignment
    const skillAssignment = await SkillAssignment.create({
      expiry_date: new Date(),
      staff_id: staff.id,
      skill_id: skill.id,
      skill_level_id: skillLevel.id
    });

    // Fetch the skill assignment with associations
    const fetchedSkillAssignment = await SkillAssignment.findByPk(skillAssignment.id, {
      include: [Staff, Skill, SkillLevel]
    });

    expect(fetchedSkillAssignment).toBeDefined();
    expect(fetchedSkillAssignment.expiry_date).toBeInstanceOf(Date);
    expect(fetchedSkillAssignment.staff_id).toBe(staff.id);
    expect(fetchedSkillAssignment.skill_id).toBe(skill.id);
    expect(fetchedSkillAssignment.skill_level_id).toBe(skillLevel.id);
    expect(fetchedSkillAssignment.staff).toBeDefined();
    expect(fetchedSkillAssignment.skill).toBeDefined();
    expect(fetchedSkillAssignment.skillLevel).toBeDefined();
  });
});
