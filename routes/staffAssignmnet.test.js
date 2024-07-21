
const request = require('supertest');
const express = require('express');
const staffAssignmentRouter = require('./staffAssignment.js'); // Update the path as necessary
const staffAssignmentController = require('../controllers/staffAssignment'); // Update the path as necessary

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use('/staffAssignments', staffAssignmentRouter);

describe('StaffAssignment Routes', () => {
    it('should get all staff assignments', async () => {
        // Mock the controller method if needed
        jest.spyOn(staffAssignmentController, 'getAll').mockImplementation((req, res) => {
            res.status(200).json([]);
        });

        const response = await request(app).get('/staffAssignments/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('should get a staff assignment by ID', async () => {
        // Mock the controller method if needed
        jest.spyOn(staffAssignmentController, 'getById').mockImplementation((req, res) => {
            res.status(200).json({ id: 1, staff_id: 1, manager_id: 2 });
        });

        const response = await request(app).get('/staffAssignments/id/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, staff_id: 1, manager_id: 2 });
    });

    it('should get staff assignments by staff ID', async () => {
        // Mock the controller method if needed
        jest.spyOn(staffAssignmentController, 'getByStaff').mockImplementation((req, res) => {
            res.status(200).json([{ id: 1, staff_id: 1, manager_id: 2 }]);
        });

        const response = await request(app).get('/staffAssignments/staff/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, staff_id: 1, manager_id: 2 }]);
    });

    it('should get staff assignments by manager ID', async () => {
        // Mock the controller method if needed
        jest.spyOn(staffAssignmentController, 'getByManager').mockImplementation((req, res) => {
            res.status(200).json([{ id: 1, staff_id: 1, manager_id: 2 }]);
        });

        const response = await request(app).get('/staffAssignments/skill/2');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, staff_id: 1, manager_id: 2 }]);
    });

    it('should create a new staff assignment', async () => {
        const newStaffAssignment = { staff_id: 1, manager_id: 2 };
        // Mock the controller method if needed
        jest.spyOn(staffAssignmentController, 'create').mockImplementation((req, res) => {
            res.status(201).json(newStaffAssignment);
        });

        const response = await request(app).post('/staffAssignments/').send(newStaffAssignment);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(newStaffAssignment);
    });

    it('should delete a staff assignment', async () => {
        // Mock the controller method if needed
        jest.spyOn(staffAssignmentController, 'deleting').mockImplementation((req, res) => {
            res.status(204).end();
        });

        const response = await request(app).delete('/staffAssignments/').send({ id: 1 });
        expect(response.status).toBe(204);
    });
});
