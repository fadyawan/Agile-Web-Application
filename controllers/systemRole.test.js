// test/systemRole.test.js

const request = require('supertest');
const express = require('express');
const SequelizeMock = require('sequelize-mock');
const utilities = require('../utilities/utility');

const app = express();
app.use(express.json());

// Mock the Sequelize instance
const DBConnectionMock = new SequelizeMock();

// Mock models
const SystemRoleMock = DBConnectionMock.define('SystemRole', {
    id: 1,
    system_role: 'Admin'
});

// Mocking the db module to use mocked models
const db = {
    systemRole: SystemRoleMock
};

// Mocking utilities
jest.mock('../utilities/utility');

// Import the systemRole controller with mocked models
const systemRoleController = require('../controllers/systemRole');

// Assign routes to the app
app.get('/systemRole', systemRoleController.getAll);
app.get('/systemRole/:id', systemRoleController.getById);
app.post('/systemRole', systemRoleController.create);
app.put('/systemRole', systemRoleController.update);
app.delete('/systemRole', systemRoleController.deleting);

describe('SystemRole Controller', () => {
    describe('GET /systemRole', () => {
        it('should return all system roles', async () => {
            const response = await request(app).get('/systemRole');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe('GET /systemRole/:id', () => {
        it('should return a system role by id', async () => {
            const response = await request(app).get('/systemRole/1');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        });

        it('should return 400 if system role not found', async () => {
            SystemRoleMock.findByPk.withArgs(2).returns(null);
            const response = await request(app).get('/systemRole/2');

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Unable to find the system role with id 2');
            expect(response.status).toBe(400);
        });
    });

    describe('POST /systemRole', () => {
        it('should create a new system role', async () => {
            const newSystemRole = {
                system_role: 'Manager'
            };

            const response = await request(app).post('/systemRole').send(newSystemRole);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
        });

        it('should return 400 if essential fields are missing', async () => {
            const response = await request(app).post('/systemRole').send({});

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Essential fields missing');
            expect(response.status).toBe(400);
        });
    });

    describe('PUT /systemRole', () => {
        it('should update a system role', async () => {
            const updateData = {
                id: 1,
                system_role: 'Super Admin'
            };

            const response = await request(app).put('/systemRole').send(updateData);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        });

        it('should return 400 if essential fields are missing', async () => {
            const response = await request(app).put('/systemRole').send({ id: 1 });

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Missing essential fields');
            expect(response.status).toBe(400);
        });
    });

    describe('DELETE /systemRole', () => {
        it('should delete a system role', async () => {
            const response = await request(app).delete('/systemRole').send({ id: 1 });

            expect(response.status).toBe(200);
            expect(response.text).toBe('system role deleted');
        });

        it('should return 404 if id not found', async () => {
            SystemRoleMock.destroy.withArgs({ where: { id: 2 } }).returns(0);
            const response = await request(app).delete('/systemRole').send({ id: 2 });

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 404, 'Id not found');
            expect(response.status).toBe(404);
        });
    });
});

