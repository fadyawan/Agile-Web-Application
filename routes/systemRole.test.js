

const request = require('supertest');
const express = require('express');
const systemRoleRouter = require('./systemRole.js'); // Update the path as necessary
const systemRoleController = require('../controllers/systemRole'); // Update the path as necessary

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use('/systemRoles', systemRoleRouter);

describe('SystemRole Routes', () => {
    it('should get all system roles', async () => {
        // Mock the controller method if needed
        jest.spyOn(systemRoleController, 'getAll').mockImplementation((req, res) => {
            res.status(200).json([]);
        });

        const response = await request(app).get('/systemRoles/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('should get a system role by ID', async () => {
        // Mock the controller method if needed
        jest.spyOn(systemRoleController, 'getById').mockImplementation((req, res) => {
            res.status(200).json({ id: 1, system_role: 'Admin' });
        });

        const response = await request(app).get('/systemRoles/id/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, system_role: 'Admin' });
    });

    it('should create a new system role', async () => {
        const newSystemRole = { system_role: 'User' };
        // Mock the controller method if needed
        jest.spyOn(systemRoleController, 'create').mockImplementation((req, res) => {
            res.status(201).json(newSystemRole);
        });

        const response = await request(app).post('/systemRoles/').send(newSystemRole);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(newSystemRole);
    });

    it('should update a system role', async () => {
        const updatedSystemRole = { id: 1, system_role: 'Super Admin' };
        // Mock the controller method if needed
        jest.spyOn(systemRoleController, 'update').mockImplementation((req, res) => {
            res.status(200).json(updatedSystemRole);
        });

        const response = await request(app).put('/systemRoles/').send(updatedSystemRole);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedSystemRole);
    });

    it('should delete a system role', async () => {
        // Mock the controller method if needed
        jest.spyOn(systemRoleController, 'deleting').mockImplementation((req, res) => {
            res.status(204).end();
        });

        const response = await request(app).delete('/systemRoles/').send({ id: 1 });
        expect(response.status).toBe(204);
    });
});
