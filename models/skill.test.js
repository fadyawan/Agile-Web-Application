const { Sequelize, DataTypes } = require('sequelize');
const { Skill, SkillCategory } = require('../models'); // Adjust the path as needed

describe('Skill Model', () => {
  let sequelize;
  let skill;
  let skillCategory;

  beforeAll(async () => {
    // Initialize Sequelize and create the models
    sequelize = new Sequelize('sqlite::memory:'); // Using in-memory SQLite for testing

    // Define the SkillCategory model
    skillCategory = SkillCategory(sequelize, DataTypes);

    // Define the Skill model
    skill = Skill(sequelize, DataTypes, SkillCategory);

    // Sync the models with the database
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('should define Skill model with correct attributes', () => {
    expect(skill.rawAttributes).toHaveProperty('description');
    expect(skill.rawAttributes.description.type).toBe(DataTypes.STRING);
    expect(skill.rawAttributes.description.allowNull).toBe(false);
  });

  test('should associate with SkillCategory model', () => {
    expect(skill.associations.SkillCategory).toBeDefined();
    expect(skill.belongsTo).toHaveBeenCalledWith(skillCategory, { foreignKey: 'skill_category_id' });
  });

  test('should create a Skill record', async () => {
    const category = await skillCategory.create({ name: 'Programming' }); // Ensure SkillCategory model has required attributes
    const skills = await skill.create({ description: 'JavaScript', skill_category_id: category.id });

    expect(skills).toBeDefined();
    expect(skills.description).toBe('JavaScript');
  });
});
