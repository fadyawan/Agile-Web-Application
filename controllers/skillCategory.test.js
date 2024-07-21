// tests/skillCategory.test.js
const SequelizeMock = require('sequelize-mock');
const express = require('express');
const request = require('supertest');
const utilities = require('../utilities/utility');  // Adjust the path as necessary
const skillCategoryController = require('../controllers/skillCategory');

// Initialize Sequelize Mock
const DBConnectionMock = new SequelizeMock();

// Mock the SkillCategory model
const SkillCategoryMock = DBConnectionMock.define('SkillCategory', {
    id: 1,
    description: 'Mock Skill Category'
});

// Mock the utilities
jest.mock('../utilities/utility', () => ({
    formatErrorResponse: jest.fn((res, status, message) => res.status(status).json({ error: message })),
}));

// Mock the db object
jest.mock('../models', () => ({
    SkillCategory: SkillCategoryMock
}));

// Set up express app for testing
const app = express();
app.use(express.json()); // To parse JSON bodies
app.use('/skillCategories', require('../routes/skillCategory'));  // Adjust the path as necessary

describe('SkillCategory Controller', () => {
    it('should get all skill categories', async () => {
        const response = await request(app).get('/skillCategories/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
            id: 1,
            description: 'Mock Skill Category'
        }]);
    });

    it('should get a skill category by ID', async () => {
        const response = await request(app).get('/skillCategories/id/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 1,
            description: 'Mock Skill Category'
        });
    });

    it('should return error for non-existent skill category by ID', async () => {
        SkillCategoryMock.findByPk.mockReturnValueOnce(null);
        const response = await request(app).get('/skillCategories/id/99');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'Unable to find the skill category with id 99'
        });
    });

    it('should create a new skill category', async () => {
        const newSkillCategory = { description: 'New Skill Category' };
        const response = await request(app).post('/skillCategories/').send(newSkillCategory);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(newSkillCategory);
    });

    it('should return error when creating a skill category with missing fields', async () => {
        const response = await request(app).post('/skillCategories/').send({});
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'Essential fields missing'
        });
    });

    it('should delete a skill category', async () => {
        const response = await request(app).delete('/skillCategories/').send({ id: 1 });
        expect(response.status).toBe(200);
        expect(response.text).toBe('skill category deleted');
    });

    it('should return error when deleting a non-existent skill category', async () => {
        SkillCategoryMock.destroy.mockReturnValueOnce(0);
        const response = await request(app).delete('/skillCategories/').send({ id: 99 });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            error: 'Id not found'
        });
    });

    it('should update a skill category', async () => {
        const updatedSkillCategory = { id: 1, description: 'Updated Skill Category' };
        const response = await request(app).put('/skillCategories/').send(updatedSkillCategory);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedSkillCategory);
    });

    it('should return error when updating a skill category with missing fields', async () => {
        const response = await request(app).put('/skillCategories/').send({ id: 1 });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'Missing essential fields'
        });
    });
});
