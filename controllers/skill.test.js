const request = require('supertest');
const express = require('express');
const app = require('../app'); // Ensure your app exports the Express instance
const db = require('../models');
const Skill = db.skill;
const SkillCategory = db.skillCategory;
const SkillAssignment = db.skillAssignment;

// Mock Sequelize Models
const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();

const SkillMock = dbMock.define('skill', {
    description: 'Sample Skill',
});
const SkillCategoryMock = dbMock.define('skill_category', {
    description: 'Sample Category',
});
const SkillAssignmentMock = dbMock.define('skill_assignment', {});

// Set up models
db.skill = SkillMock;
db.skillCategory = SkillCategoryMock;
db.skillAssignment = SkillAssignmentMock;

describe('Skills Controller', () => {
    beforeAll(async () => {
        // Sync the mock database
        await dbMock.sync({ force: true });
    });

    afterAll(async () => {
        // Cleanup after tests
        await dbMock.close();
    });

    it('should fetch all skills', async () => {
        const response = await request(app).get('/api/skill');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should fetch skill by id', async () => {
        const skill = await Skill.create({ description: 'Test Skill', skill_category_id: 1 });
        const response = await request(app).get(`/api/skill/id/${skill.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('description', 'Test Skill');
    });

    it('should fetch skill by description', async () => {
        await Skill.create({ description: 'Test Skill', skill_category_id: 1 });
        const response = await request(app).get('/api/skill/description/Test Skill');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should fetch skills by category', async () => {
        await Skill.create({ description: 'Test Skill', skill_category_id: 1 });
        const response = await request(app).get('/api/skill/category/1');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should create a new skill', async () => {
        const response = await request(app)
            .post('/api/skill')
            .send({ description: 'New Skill', skill_category_id: 1 });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('description', 'New Skill');
    });

    it('should update a skill', async () => {
        const skill = await Skill.create({ description: 'Old Skill', skill_category_id: 1 });
        const response = await request(app)
            .put('/api/skill')
            .send({ id: skill.id, description: 'Updated Skill', skill_category_id: 1 });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Skill updated successfully');
    });

    it('should delete a skill', async () => {
        const skill = await Skill.create({ description: 'Skill to Delete', skill_category_id: 1 });
        const response = await request(app)
            .delete('/api/skill')
            .send({ id: skill.id });
        expect(response.status).toBe(200);
        expect(response.text).toBe('Skill deleted');
    });
});

