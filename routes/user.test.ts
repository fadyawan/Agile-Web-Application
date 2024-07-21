
const request = require('supertest');
const express = require('express');
const userRouter = require('./user.js'); // Update the path as necessary
const userController = require('../controllers/user'); // Update the path as necessary

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use('/', userRouter);

describe('User Routes', () => {
    it('should get all users', async () => {
        // Mock the controller method if needed
        jest.spyOn(userController, 'getAll').mockImplementation((req, res) => {
            res.status(200).json([]);
        });

        const response = await request(app).get('/users/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('should get a user by ID', async () => {
        // Mock the controller method if needed
        jest.spyOn(userController, 'getById').mockImplementation((req, res) => {
            res.status(200).json({ id: 1, firstname: 'John', surname: 'Doe' });
        });

        const response = await request(app).get('/users/id/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, firstname: 'John', surname: 'Doe' });
    });

    it('should get users by name', async () => {
        // Mock the controller method if needed
        jest.spyOn(userController, 'getByName').mockImplementation((req, res) => {
            res.status(200).json([{ id: 1, firstname: 'John', surname: 'Doe' }]);
        });

        const response = await request(app).get('/users/name/John/Doe');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, firstname: 'John', surname: 'Doe' }]);
    });

    it('should get users by job role', async () => {
        // Mock the controller method if needed
        jest.spyOn(userController, 'getByJobRole').mockImplementation((req, res) => {
            res.status(200).json([{ id: 1, job_role: 'Developer' }]);
        });

        const response = await request(app).get('/users/jobrole/Developer');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, job_role: 'Developer' }]);
    });

    it('should get users by system role', async () => {
        // Mock the controller method if needed
        jest.spyOn(userController, 'getBySystemRole').mockImplementation((req, res) => {
            res.status(200).json([{ id: 1, system_role: 'Admin' }]);
        });

        const response = await request(app).get('/users/sysRole/Admin');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, system_role: 'Admin' }]);
    });

    it('should create a new user', async () => {
        const newUser = { firstname: 'Jane', surname: 'Doe', username: 'janedoe', password: 'securepassword', job_role: 'Manager', system_role_id: 2 };
        // Mock the controller method if needed
        jest.spyOn(userController, 'create').mockImplementation((req, res) => {
            res.status(201).json(newUser);
        });

        const response = await request(app).post('/users/').send(newUser);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(newUser);
    });

    it('should update a user', async () => {
        const updatedUser = { id: 1, firstname: 'Jane', surname: 'Doe', username: 'janedoe', password: 'newpassword', job_role: 'Senior Manager', system_role_id: 2 };
        // Mock the controller method if needed
        jest.spyOn(userController, 'update').mockImplementation((req, res) => {
            res.status(200).json(updatedUser);
        });

        const response = await request(app).put('/users/').send(updatedUser);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedUser);
    });

    it('should delete a user', async () => {
        // Mock the controller method if needed
        jest.spyOn(userController, 'deleting').mockImplementation((req, res) => {
            res.status(204).end();
        });

        const response = await request(app).delete('/users/').send({ id: 1 });
        expect(response.status).toBe(204);
    });
});
