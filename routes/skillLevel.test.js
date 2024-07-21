

const request = require('supertest');
const express = require('express');
const skillLevelRouter = require('./skillLevel.js'); // Update the path as necessary
const skillLevelController = require('../controllers/skillLevel'); // Update the path as necessary

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use('/skillLevels', skillLevelRouter);

describe('SkillLevel Routes', () => {
    it('should get all skill levels', async () => {
        // Mock the controller method if needed
        jest.spyOn(skillLevelController, 'getAll').mockImplementation((req, res) => {
            res.status(200).json([]);
        });

        const response = await request(app).get('/skillLevels/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('should get a skill level by ID', async () => {
        // Mock the controller method if needed
        jest.spyOn(skillLevelController, 'getById').mockImplementation((req, res) => {
            res.status(200).json({ id: 1, skill_level: 'Expert' });
        });

        const response = await request(app).get('/skillLevels/id/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, skill_level: 'Expert' });
    });

    it('should create a new skill level', async () => {
        const newSkillLevel = { skill_level: 'Intermediate' };
        // Mock the controller method if needed
        jest.spyOn(skillLevelController, 'create').mockImplementation((req, res) => {
            res.status(201).json(newSkillLevel);
        });

        const response = await request(app).post('/skillLevels/').send(newSkillLevel);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(newSkillLevel);
    });

    it('should update a skill level', async () => {
        const updatedSkillLevel = { id: 1, skill_level: 'Advanced' };
        // Mock the controller method if needed
        jest.spyOn(skillLevelController, 'update').mockImplementation((req, res) => {
            res.status(200).json(updatedSkillLevel);
        });

        const response = await request(app).put('/skillLevels/').send(updatedSkillLevel);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedSkillLevel);
    });

    it('should delete a skill level', async () => {
        // Mock the controller method if needed
        jest.spyOn(skillLevelController, 'deleting').mockImplementation((req, res) => {
            res.status(204).end();
        });

        const response = await request(app).delete('/skillLevels/').send({ id: 1 });
        expect(response.status).toBe(204);
    });
});
