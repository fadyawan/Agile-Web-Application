// models/skill.test.js
const { Sequelize, DataTypes } = require('sequelize');
const SkillModel = require('./skill'); // Adjust the path as needed
const SkillCategoryModel = require('./skillCategory'); // Adjust the path as needed

describe('Skill Model', () => {
  let sequelize;
  let Skill;
  let SkillCategory;

  beforeAll(async () => {
    // Initialize Sequelize instance
    sequelize = new Sequelize('sqlite::memory:', { logging: false });

    // Define models
    SkillCategory = SkillCategoryModel(sequelize, Sequelize);
    Skill = SkillModel(sequelize, Sequelize, SkillCategory);

    // Sync the database
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Close the connection
    await sequelize.close();
  });

  it('should define the Skill model correctly', () => {
    expect(Skill).toBeDefined();
    expect(Skill.tableName).toBe('skill');
    expect(Skill.rawAttributes.description).toBeDefined();
    expect(Skill.rawAttributes.description.type).toBeInstanceOf(DataTypes.STRING);
    expect(Skill.rawAttributes.description.allowNull).toBe(false);
  });

  it('should define associations with SkillCategory model', () => {
    const associations = Skill.associations;

    expect(associations.skillCategory).toBeDefined();
    expect(associations.skillCategory.associationType).toBe('BelongsTo');
    expect(associations.skillCategory.target.name).toBe('SkillCategory');
    expect(associations.skillCategory.options.foreignKey).toBe('skill_category_id');
  });

  it('should create a skill and associate it with a skill category', async () => {
    // Create a skill category
    const category = await SkillCategory.create({ description: 'Programming' });

    // Create a skill associated with the skill category
    const skill = await Skill.create({ description: 'JavaScript', skill_category_id: category.id });

    // Fetch the skill with associated category
    const fetchedSkill = await Skill.findByPk(skill.id, { include: SkillCategory });

    expect(fetchedSkill).toBeDefined();
    expect(fetchedSkill.description).toBe('JavaScript');
    expect(fetchedSkill.skill_category_id).toBe(category.id);
    expect(fetchedSkill.skill_category).toBeDefined();
    expect(fetchedSkill.skill_category.description).toBe('Programming');
  });
});
