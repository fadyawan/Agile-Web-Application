const request = require('supertest');
const express = require('express');
const app = express();
const { Sequelize, DataTypes } = require('sequelize');
const SkillController = require('../controllers/skill');
const SkillModel = require('../models/skill');
const SkillCategoryModel = require('../models/skillCategory');
const SkillAssignmentModel = require('../models/skillAssignment');
const utilities = require('../utilities/utility');

// Initialize express app and set up routes
app.use(express.json());
app.use('/api/skills', require('../routes/skill'));

// Mock utilities
jest.mock('../utilities/utility', () => ({
    formatErrorResponse: jest.fn((res, status, message) => res.status(status).send(message))
}));

// In-memory SQLite database setup for testing
const sequelize = new Sequelize('sqlite::memory:', { logging: false });

// Define models
const Skill = SkillModel(sequelize, DataTypes);
const SkillCategory = SkillCategoryModel(sequelize, DataTypes);
const SkillAssignment = SkillAssignmentModel(sequelize, DataTypes, {}, Skill, {});

// Sync the database
beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Skill Controller', () => {
    // Seed data
    beforeEach(async () => {
        const category = await SkillCategory.create({ description: 'Programming' });
        await Skill.create({ description: 'JavaScript', skill_category_id: category.id });
    });

    // Test getAll
    it('should get all skills', async () => {
        const response = await request(app).get('/api/skills');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });

    // Test getSkillById
    it('should get skill by ID', async () => {
        const skill = await Skill.findOne();
        const response = await request(app).get(`/api/skills/id/${skill.id}`);
        expect(response.status).toBe(200);
        expect(response.body.description).toBe('JavaScript');
    });

    it('should handle skill not found by ID', async () => {
        const response = await request(app).get('/api/skills/id/9999');
        expect(response.status).toBe(400);
        expect(response.text).toBe('Unable to find the skill with id 9999');
    });

    // Test getSkillByDescription
    it('should get skill by description', async () => {
        const response = await request(app).get('/api/skills/description/JavaScript');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });

    it('should handle skill not found by description', async () => {
        const response = await request(app).get('/api/skills/description/NonExistingSkill');
        expect(response.status).toBe(400);
        expect(response.text).toBe('Unable to find the skill with the description NonExistingSkill');
    });

    // Test getSkillByCategory
    it('should get skill by category', async () => {
        const category = await SkillCategory.findOne();
        const response = await request(app).get(`/api/skills/category/${category.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });

    it('should handle no skills found by category', async () => {
        const response = await request(app).get('/api/skills/category/9999');
        expect(response.status).toBe(400);
        expect(response.text).toBe('Unable to find the skills within the category 9999');
    });

    // Test create
    it('should create a new skill', async () => {
        const category = await SkillCategory.create({ description: 'Design' });
        const response = await request(app).post('/api/skills')
            .send({ description: 'Photoshop', skill_category_id: category.id });
        expect(response.status).toBe(201);
        expect(response.body.description).toBe('Photoshop');
    });

    it('should handle missing fields when creating a skill', async () => {
        const response = await request(app).post('/api/skills')
            .send({ description: 'Photoshop' });
        expect(response.status).toBe(400);
        expect(response.text).toBe('Essential fields missing');
    });

    // Test update
    it('should update a skill', async () => {
        const skill = await Skill.findOne();
        const category = await SkillCategory.create({ description: 'Testing' });
        const response = await request(app).put('/api/skills')
            .send({ id: skill.id, description: 'Advanced JavaScript', skill_category_id: category.id });
        expect(response.status).toBe(201);
        expect(response.body.description).toBe('Advanced JavaScript');
    });

    it('should handle skill not found when updating', async () => {
        const response = await request(app).put('/api/skills')
            .send({ id: 9999, description: 'Advanced JavaScript', skill_category_id: 1 });
        expect(response.status).toBe(400);
        expect(response.text).toBe('Unable to find the  skill with id9999');
    });

    // Test deleting
    it('should delete a skill', async () => {
        const skill = await Skill.findOne();
        const response = await request(app).delete('/api/skills')
            .send({ id: skill.id });
        expect(response.status).toBe(200);
        expect(response.text).toBe('skill deleted');
    });

    it('should handle skill with assignments when deleting', async () => {
        const skill = await Skill.findOne();
        await SkillAssignment.create({ skill_id: skill.id, expiry_date: new Date() });
        const response = await request(app).delete('/api/skills')
            .send({ id: skill.id });
        expect(response.status).toBe(400);
        expect(response.text).toBe('this skill has assignments, delete these first.');
    });

    it('should handle skill not found when deleting', async () => {
        const response = await request(app).delete('/api/skills')
            .send({ id: 9999 });
        expect(response.status).toBe(404);
        expect(response.text).toBe('Id not found');
    });
});
