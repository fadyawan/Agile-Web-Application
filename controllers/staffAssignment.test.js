// tests/staffAssignment.test.js

const SequelizeMock = require('sequelize-mock');
const express = require('express');
const request = require('supertest');
const utilities = require('../utilities/utility');  // Adjust the path as necessary
const staffAssignmentController = require('../controllers/staffAssignment');
const app = require('../app');

// Initialize Sequelize Mock
const DBConnectionMock = new SequelizeMock();

// Mock the StaffAssignment and User models
const StaffAssignmentMock = DBConnectionMock.define('StaffAssignment', {
    id: 1,
    staff_id: 1,
    manager_id: 2,
});
const UserMock = DBConnectionMock.define('User', {
    id: 1,
    firstname: 'John',
    surname: 'Doe',
});

// Mock the utilities
jest.mock('../utilities/utility', () => ({
    formatErrorResponse: jest.fn((res, status, message) => res.status(status).json({ error: message })),
}));

// Mock the db object
jest.mock('../models', () => ({
    staffAssignment: StaffAssignmentMock,
    user: UserMock,
}));

// Set up express app for testing
const app = express();
app.use(express.json()); // To parse JSON bodies
app.use('/staffAssignments', require('../routes/staffAssignment'));  // Adjust the path as necessary

describe('StaffAssignment Controller', () => {
    it('should get all staff assignments', async () => {
        const response = await request(app).get('/staffAssignments/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
            id: 1,
            staff_id: 1,
            manager_id: 2,
        }]);
    });

    it('should get a staff assignment by ID', async () => {
        const response = await request(app).get('/staffAssignments/id/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 1,
            staff_id: 1,
            manager_id: 2,
        });
    });

    it('should return error for non-existent staff assignment by ID', async () => {
        StaffAssignmentMock.findByPk.mockReturnValueOnce(null);
        const response = await request(app).get('/staffAssignments/id/99');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'Unable to find the staff assignment with id 99',
        });
    });

    it('should get assignments by staff ID', async () => {
        const response = await request(app).get('/staffAssignments/staff/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
            id: 1,
            staff_id: 1,
            manager_id: 2,
        }]);
    });

    it('should return error for non-existent staff by ID', async () => {
        UserMock.findByPk.mockReturnValueOnce(null);
        const response = await request(app).get('/staffAssignments/staff/99');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'Unable to find staff with id 99',
        });
    });

    it('should create a new staff assignment', async () => {
        const newStaffAssignment = { staff_id: 1, manager_id: 2 };
        const response = await request(app).post('/staffAssignments/').send(newStaffAssignment);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(newStaffAssignment);
    });

    it('should return error when creating a staff assignment with missing fields', async () => {
        const response = await request(app).post('/staffAssignments/').send({});
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'Essential fields missing',
        });
    });

    it('should delete a staff assignment', async () => {
        const response = await request(app).delete('/staffAssignments/').send({ id: 1 });
        expect(response.status).toBe(200);
        expect(response.text).toBe('staff assignment deleted');
    });

    it('should return error when deleting a non-existent staff assignment', async () => {
        StaffAssignmentMock.destroy.mockReturnValueOnce(0);
        const response = await request(app).delete('/staffAssignments/').send({ id: 99 });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            error: 'Id not found',
        });
    });
});
