// test/skillAssignment.test.js

const request = require('supertest');
const express = require('express');
const SequelizeMock = require('sequelize-mock');
const utilities = require('../utilities/utility');
const app = require('../app');

const app = express();
app.use(express.json());

// Mock the Sequelize instance
const DBConnectionMock = new SequelizeMock();

// Mock models
const SkillAssignmentMock = DBConnectionMock.define('SkillAssignment', {
    id: 1,
    staff_id: 1,
    skill_id: 1,
    skill_level_id: 1,
    expiry_date: '2024-12-31'
});

const SkillMock = DBConnectionMock.define('Skill', {
    id: 1,
    description: 'JavaScript'
});

const UserMock = DBConnectionMock.define('User', {
    id: 1,
    firstname: 'John',
    surname: 'Doe'
});

const SkillLevelMock = DBConnectionMock.define('SkillLevel', {
    id: 1,
    level: 'Expert'
});

// Mocking the db module to use mocked models
const db = {
    skillAssignment: SkillAssignmentMock,
    skill: SkillMock,
    user: UserMock,
    skillLevel: SkillLevelMock
};

// Mocking utilities
jest.mock('../utilities/utility');

// Import the skillAssignment controller with mocked models
const skillAssignmentController = require('../controllers/skillAssignment');

// Assign routes to the app
app.get('/skillAssignment', skillAssignmentController.getAll);
app.get('/skillAssignment/:id', skillAssignmentController.getById);
app.post('/skillAssignment', skillAssignmentController.create);
app.delete('/skillAssignment', skillAssignmentController.deleting);
app.put('/skillAssignment', skillAssignmentController.update);
app.get('/skillAssignment/skill/:skill', skillAssignmentController.getBySkills);
app.get('/skillAssignment/staff/:firstname/:surname', skillAssignmentController.getByStaff);
app.get('/staffDetails', skillAssignmentController.getAllStaffDetails);

describe('SkillAssignment Controller', () => {
    describe('GET /skillAssignment', () => {
        it('should return all skill assignments', async () => {
            const response = await request(app).get('/skillAssignment');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe('GET /skillAssignment/:id', () => {
        it('should return a skill assignment by id', async () => {
            const response = await request(app).get('/skillAssignment/1');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        });

        it('should return 400 if skill assignment not found', async () => {
            SkillAssignmentMock.findByPk.withArgs(2).returns(null);
            const response = await request(app).get('/skillAssignment/2');

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Unable to find the skill assignment with id 2');
            expect(response.status).toBe(400);
        });
    });

    describe('POST /skillAssignment', () => {
        it('should create a new skill assignment', async () => {
            const newAssignment = {
                staff_id: 1,
                skill_id: 1,
                skill_level_id: 1,
                expiry_date: '2024-12-31'
            };

            const response = await request(app).post('/skillAssignment').send(newAssignment);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
        });

        it('should return 400 if essential fields are missing', async () => {
            const response = await request(app).post('/skillAssignment').send({});

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Essential fields missing');
            expect(response.status).toBe(400);
        });
    });

    describe('DELETE /skillAssignment', () => {
        it('should delete a skill assignment', async () => {
            const response = await request(app).delete('/skillAssignment').send({ id: 1 });

            expect(response.status).toBe(200);
            expect(response.text).toBe('skill assignment deleted');
        });

        it('should return 404 if id not found', async () => {
            SkillAssignmentMock.destroy.withArgs({ where: { id: 2 } }).returns(0);
            const response = await request(app).delete('/skillAssignment').send({ id: 2 });

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 404, 'Id not found');
            expect(response.status).toBe(404);
        });
    });

    // Add more tests for other methods...

    describe('PUT /skillAssignment', () => {
        it('should update a skill assignment', async () => {
            const updateData = {
                id: 1,
                expiry_date: '2025-01-01',
                skill_level_id: 2
            };

            const response = await request(app).put('/skillAssignment').send(updateData);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        });

        it('should return 400 if essential fields are missing', async () => {
            const response = await request(app).put('/skillAssignment').send({});

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Missing essential fields');
            expect(response.status).toBe(400);
        });
    });
});
