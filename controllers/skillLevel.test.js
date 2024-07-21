// test/skillLevel.test.js
const app = require('../app');
const request = require('supertest');
const express = require('express');
const SequelizeMock = require('sequelize-mock');
const utilities = require('../utilities/utility');

const app = express();
app.use(express.json());

// Mock the Sequelize instance
const DBConnectionMock = new SequelizeMock();

// Mock models
const SkillLevelMock = DBConnectionMock.define('SkillLevel', {
    id: 1,
    skill_level: 'Beginner'
});

// Mocking the db module to use mocked models
const db = {
    skillLevel: SkillLevelMock
};

// Mocking utilities
jest.mock('../utilities/utility');

// Import the skillLevel controller with mocked models
const skillLevelController = require('../controllers/skillLevel');

// Assign routes to the app
app.get('/skillLevel', skillLevelController.getAll);
app.get('/skillLevel/:id', skillLevelController.getById);
app.post('/skillLevel', skillLevelController.create);
app.put('/skillLevel', skillLevelController.update);
app.delete('/skillLevel', skillLevelController.deleting);

describe('SkillLevel Controller', () => {
    describe('GET /skillLevel', () => {
        it('should return all skill levels', async () => {
            const response = await request(app).get('/skillLevel');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe('GET /skillLevel/:id', () => {
        it('should return a skill level by id', async () => {
            const response = await request(app).get('/skillLevel/1');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        });

        it('should return 400 if skill level not found', async () => {
            SkillLevelMock.findByPk.withArgs(2).returns(null);
            const response = await request(app).get('/skillLevel/2');

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Unable to find the skill level with id 2');
            expect(response.status).toBe(400);
        });
    });

    describe('POST /skillLevel', () => {
        it('should create a new skill level', async () => {
            const newSkillLevel = {
                skill_level: 'Intermediate'
            };

            const response = await request(app).post('/skillLevel').send(newSkillLevel);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
        });

        it('should return 400 if essential fields are missing', async () => {
            const response = await request(app).post('/skillLevel').send({});

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Essential fields missing');
            expect(response.status).toBe(400);
        });
    });

    describe('PUT /skillLevel', () => {
        it('should update a skill level', async () => {
            const updateData = {
                id: 1,
                skill_level: 'Advanced'
            };

            const response = await request(app).put('/skillLevel').send(updateData);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        });

        it('should return 400 if essential fields are missing', async () => {
            const response = await request(app).put('/skillLevel').send({ id: 1 });

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Missing essential fields');
            expect(response.status).toBe(400);
        });
    });

    describe('DELETE /skillLevel', () => {
        it('should delete a skill level', async () => {
            const response = await request(app).delete('/skillLevel').send({ id: 1 });

            expect(response.status).toBe(200);
            expect(response.text).toBe('skill category deleted');
        });

        it('should return 404 if id not found', async () => {
            SkillLevelMock.destroy.withArgs({ where: { id: 2 } }).returns(0);
            const response = await request(app).delete('/skillLevel').send({ id: 2 });

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 404, 'Id not found');
            expect(response.status).toBe(404);
        });
    });
});

