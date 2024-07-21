// test/user.test.js
const request = require('supertest');
const express = require('express');
const SequelizeMock = require('sequelize-mock');
const utilities = require('../utilities/utility');

const app = express();
app.use(express.json());

// Mock the Sequelize instance
const DBConnectionMock = new SequelizeMock();

// Mock models
const UserMock = DBConnectionMock.define('User', {
    id: 1,
    firstname: 'John',
    surname: 'Doe',
    username: 'johndoe',
    password: 'password',
    job_role: 'Developer',
    system_role_id: 1
});

const SystemRoleMock = DBConnectionMock.define('SystemRole', {
    id: 1,
    system_role: 'Admin'
});

// Mocking the db module to use mocked models
const db = {
    user: UserMock,
    systemRole: SystemRoleMock
};

// Mocking utilities
jest.mock('../utilities/utility');

// Import the user controller with mocked models
const userController = require('../controllers/user');

// Assign routes to the app
app.get('/user', userController.getAll);
app.get('/user/:id', userController.getById);
app.post('/user', userController.create);
app.put('/user', userController.update);
app.delete('/user', userController.deleting);
app.get('/user/name/:firstname/:surname', userController.getByName);
app.get('/user/jobrole/:job_role', userController.getByJobRole);
app.get('/user/systemrole/:system_role', userController.getBySystemRole);

describe('User Controller', () => {
    describe('GET /user', () => {
        it('should return all users', async () => {
            const response = await request(app).get('/user');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe('GET /user/:id', () => {
        it('should return a user by id', async () => {
            const response = await request(app).get('/user/1');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        });

        it('should return 400 if user not found', async () => {
            UserMock.findByPk.withArgs(2).returns(null);
            const response = await request(app).get('/user/2');

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Unable to find the user with id 2');
            expect(response.status).toBe(400);
        });
    });

    describe('POST /user', () => {
        it('should create a new user', async () => {
            const newUser = {
                firstname: 'Jane',
                surname: 'Smith',
                username: 'janesmith',
                password: 'password',
                job_role: 'Manager',
                system_role_id: 1
            };

            const response = await request(app).post('/user').send(newUser);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
        });

        it('should return 400 if essential fields are missing', async () => {
            const response = await request(app).post('/user').send({});

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Essential fields missing');
            expect(response.status).toBe(400);
        });
    });

    describe('PUT /user', () => {
        it('should update a user', async () => {
            const updateData = {
                id: 1,
                firstname: 'John',
                surname: 'Doe',
                username: 'john_doe_updated',
                password: 'newpassword',
                job_role: 'Lead Developer',
                system_role_id: 1
            };

            const response = await request(app).put('/user').send(updateData);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        });

        it('should return 400 if essential fields are missing', async () => {
            const response = await request(app).put('/user').send({ id: 1 });

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Essential fields missing');
            expect(response.status).toBe(400);
        });
    });

    describe('DELETE /user', () => {
        it('should delete a user', async () => {
            const response = await request(app).delete('/user').send({ id: 1 });

            expect(response.status).toBe(200);
            expect(response.text).toBe('user deleted');
        });

        it('should return 404 if id not found', async () => {
            UserMock.destroy.withArgs({ where: { id: 2 } }).returns(0);
            const response = await request(app).delete('/user').send({ id: 2 });

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 404, 'Id not found');
            expect(response.status).toBe(404);
        });
    });

    describe('GET /user/name/:firstname/:surname', () => {
        it('should return a user by name', async () => {
            const response = await request(app).get('/user/name/John/Doe');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('should return 400 if user not found', async () => {
            UserMock.findAll.withArgs({ where: { firstname: 'Jane', surname: 'Smith' } }).returns([]);
            const response = await request(app).get('/user/name/Jane/Smith');

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Unable to find user with the name Jane Smith');
            expect(response.status).toBe(400);
        });
    });

    describe('GET /user/jobrole/:job_role', () => {
        it('should return users by job role', async () => {
            const response = await request(app).get('/user/jobrole/Developer');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('should return 400 if no users found with job role', async () => {
            UserMock.findAll.withArgs({ where: { job_role: 'NonExistentRole' } }).returns([]);
            const response = await request(app).get('/user/jobrole/NonExistentRole');

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Unable to find any users with the job role NonExistentRole');
            expect(response.status).toBe(400);
        });
    });

    describe('GET /user/systemrole/:system_role', () => {
        it('should return users by system role', async () => {
            const response = await request(app).get('/user/systemrole/Admin');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('should return 400 if system role not found', async () => {
            SystemRoleMock.findAll.withArgs({ where: { system_role: 'NonExistentRole' } }).returns([]);
            const response = await request(app).get('/user/systemrole/NonExistentRole');

            expect(utilities.formatErrorResponse).toHaveBeenCalledWith(expect.any(Object), 400, 'Unable to find the system role NonExistentRole');
            expect(response.status).toBe(400);
        });
    });
});

