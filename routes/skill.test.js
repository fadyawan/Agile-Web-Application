const request = require('supertest');
const express = require('express');
const skillRouter = require('./skill.js'); // Update the path as necessary
const skillController = require('../controllers/skill'); // Update the path as necessary

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use('/skills', skillRouter);

describe('Skill Routes', () => {
    it('should get all skills', async () => {
        const response = await request(app).get('/skills/');
        expect(response.status).toBe(200);
        // Additional assertions depending on the mock response
    });

    it('should get a skill by ID', async () => {
        const response = await request(app).get('/skills/id/1');
        expect(response.status).toBe(200);
        // Additional assertions depending on the mock response
    });

    it('should get a skill by description', async () => {
        const response = await request(app).get('/skills/description/test');
        expect(response.status).toBe(200);
        // Additional assertions depending on the mock response
    });

    it('should get a skill by category', async () => {
        const response = await request(app).get('/skills/category/test');
        expect(response.status).toBe(200);
        // Additional assertions depending on the mock response
    });

    it('should create a new skill', async () => {
        const newSkill = { description: 'New Skill', category: 'Test Category' };
        const response = await request(app).post('/skills/').send(newSkill);
        expect(response.status).toBe(201);
        // Additional assertions depending on the mock response
    });

    it('should update a skill', async () => {
        const updatedSkill = { id: 1, description: 'Updated Skill', category: 'Updated Category' };
        const response = await request(app).put('/skills/').send(updatedSkill);
        expect(response.status).toBe(200);
        // Additional assertions depending on the mock response
    });

    it('should delete a skill', async () => {
        const skillToDelete = { id: 1 };
        const response = await request(app).delete('/skills/').send(skillToDelete);
        expect(response.status).toBe(204);
        // Additional assertions depending on the mock response
    });
});
