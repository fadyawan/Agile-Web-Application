

const request = require('supertest');
const express = require('express');
const skillCategoryRouter = require('./skillCategory.js'); // Update the path as necessary
const skillCategoryController = require('../controllers/skillCategory'); // Update the path as necessary

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use('/skillCategories', skillCategoryRouter);

describe('SkillCategory Routes', () => {
    it('should get all skill categories', async () => {
        // Mock the controller method if needed
        jest.spyOn(skillCategoryController, 'getAll').mockImplementation((req, res) => {
            res.status(200).json([]);
        });

        const response = await request(app).get('/skillCategories/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('should get a skill category by ID', async () => {
        // Mock the controller method if needed
        jest.spyOn(skillCategoryController, 'getById').mockImplementation((req, res) => {
            res.status(200).json({ id: 1, description: 'Test Category' });
        });

        const response = await request(app).get('/skillCategories/id/1');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ id: 1, description: 'Test Category' });
    });

    it('should create a new skill category', async () => {
        const newSkillCategory = { description: 'New Category', 'id':1};
        // Mock the controller method if needed
        jest.spyOn(skillCategoryController, 'create').mockImplementation((req, res) => {
            res.status(201).json(newSkillCategory);
        });

        const response = await request(app).post('/skillCategories/').send(newSkillCategory);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(newSkillCategory);
    });

    it('should update a skill category', async () => {
        const updatedSkillCategory = { id: 1 };
        // Mock the controller method if needed
        jest.spyOn(skillCategoryController, 'update').mockImplementation((req, res) => {
            res.status(200).json(updatedSkillCategory);
        });

        const response = await request(app).put('/skillCategories/').send(updatedSkillCategory);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedSkillCategory);
    });

    it('should delete a skill category', async () => {
        // Mock the controller method if needed
        jest.spyOn(skillCategoryController, 'deleting').mockImplementation((req, res) => {
            res.status(200).end();
        });

        const response = await request(app).delete('/skillCategories/').send({ id: 1 });
        expect(response.status).toBe(200);
    });
});
