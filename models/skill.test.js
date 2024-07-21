const { Sequelize, DataTypes } = require('sequelize');
const { defineSkill, defineSkillCategory } = require('./path/to/your/models'); // Adjust the path as needed

describe('Skill Model', () => {
  let sequelize;
  let Skill;
  let SkillCategory;

  beforeAll(async () => {
    // Initialize Sequelize and create the models
    sequelize = new Sequelize('sqlite::memory:'); // Using in-memory SQLite for testing

    // Define the SkillCategory model
    SkillCategory = defineSkillCategory(sequelize, DataTypes);

    // Define the Skill model
    Skill = defineSkill(sequelize, DataTypes, SkillCategory);

    // Sync the models with the database
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('should define Skill model with correct attributes', () => {
    expect(Skill.rawAttributes).toHaveProperty('description');
    expect(Skill.rawAttributes.description.type).toBe(DataTypes.STRING);
    expect(Skill.rawAttributes.description.allowNull).toBe(false);
  });

  test('should associate with SkillCategory model', () => {
    expect(Skill.associations.SkillCategory).toBeDefined();
    expect(Skill.belongsTo).toHaveBeenCalledWith(SkillCategory, { foreignKey: 'skill_category_id' });
  });

  test('should create a Skill record', async () => {
    const category = await SkillCategory.create({ name: 'Programming' }); // Ensure SkillCategory model has required attributes
    const skill = await Skill.create({ description: 'JavaScript', skill_category_id: category.id });

    expect(skill).toBeDefined();
    expect(skill.description).toBe('JavaScript');
  });
});
