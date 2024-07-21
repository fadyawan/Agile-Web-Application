// test/skill.test.js
const request = require('supertest');
const express = require('express');
const SequelizeMock = require('sequelize-mock');
const utilities = require('../utilities/utility');


const app = express();
app.use(express.json());

// Mock the Sequelize instance
const DBConnectionMock = new SequelizeMock();

// Mock models
const SkillMock = DBConnectionMock.define('Skill', {
    id: 1,
    description: 'JavaScript',
    skillCategoryId: 1
});

const SkillCategoryMock = DBConnectionMock.define('SkillCategory', {
    id: 1,
    description: 'Programming Languages'
});

// Mocking the db module to use mocked models
const db = {
    Skill: SkillMock,
    SkillCategory: SkillCategoryMock
};

// Mocking utilities
jest.mock('../utilities/utility');

// Import the skill controller with mocked models
const skillController = require('../controllers/skill');

// Assign routes to the app
app.get('/skill', skillController.getAll);
app.get('/skill/:id', skillController.getSkillById);
app.get('/skill/description/:description', skillController.getSkillByDescription);
app.get('/skill/category/:category', skillController.getSkillByCategory);
app.post('/skill', skillController.create);
app.put('/skill/:id', skillController.update);
app.delete('/skill', skillController.deleting);

describe('Skill Controller', () => {
    describe('GET /skill', () => {
        it('should return all skills', async () => {
            const response = await request(app).get('/skill');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe('GET /skill/:id', () => {
        it('should return a skill by id', async () => {
            const response = await request(app).get('/skill/1');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        });

        it('should return 400 if skill not found', async () => {
            SkillMock.findByPk.withArgs(2).returns(null);
            const response = await request(app).get('/skill/2');

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Unable to find the skill with id 2');
            expect(response.status).toBe(400);
        });
    });

    describe('GET /skill/description/:description', () => {
        it('should return a skill by description', async () => {
            const response = await request(app).get('/skill/description/JavaScript');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('should return 400 if skill not found', async () => {
            SkillMock.findAll.withArgs({ where: { description: 'NonExistentSkill' } }).returns([]);
            const response = await request(app).get('/skill/description/NonExistentSkill');

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Unable to find the skill with the description NonExistentSkill');
            expect(response.status).toBe(400);
        });
    });

    describe('GET /skill/category/:category', () => {
        it('should return skills by category', async () => {
            const response = await request(app).get('/skill/category/Programming Languages');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('should return 400 if category not found', async () => {
            SkillCategoryMock.findAll.withArgs({ where: { description: 'NonExistentCategory' } }).returns([]);
            const response = await request(app).get('/skill/category/NonExistentCategory');

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Unable to find the skill category NonExistentCategory');
            expect(response.status).toBe(400);
        });
    });

    describe('POST /skill', () => {
        it('should create a new skill', async () => {
            const newSkill = {
                description: 'Python',
                skill_category_id: 1
            };

            const response = await request(app).post('/skill').send(newSkill);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
        });

        it('should return 400 if essential fields are missing', async () => {
            const response = await request(app).post('/skill').send({});

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Essential fields missing');
            expect(response.status).toBe(400);
        });
    });

    describe('PUT /skill/:id', () => {
        it('should update a skill', async () => {
            const updateData = {
                description: 'Python',
                skill_category_id: 1
            };

            const response = await request(app).put('/skill/1').send(updateData);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        });

        it('should return 400 if essential fields are missing', async () => {
            const response = await request(app).put('/skill/1').send({});

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Essential fields missing');
            expect(response.status).toBe(400);
        });
    });

    describe('DELETE /skill', () => {
        it('should delete a skill', async () => {
            const response = await request(app).delete('/skill').send({ id: 1 });

            expect(response.status).toBe(200);
            expect(response.text).toBe('skill deleted');
        });

        it('should return 404 if id not found', async () => {
            SkillCategoryMock.destroy.withArgs({ where: { id: 2 } }).returns(0);
            const response = await request(app).delete('/skill').send({ id: 2 });

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 404, 'Id not found');
            expect(response.status).toBe(404);
        });
    });
});

