

const request = require('supertest');
const express = require('express');
const skillAssignmentRouter = require('./skillAssignment.js'); // Update the path as necessary
const skillAssignmentController = require('../controllers/skillAssignment'); // Update the path as necessary

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use('/skillAssignments', skillAssignmentRouter);

describe('SkillAssignment Routes', () => {
    it('should get all skill assignments', async () => {
        // Mock the controller method if needed
        jest.spyOn(skillAssignmentController, 'getAll').mockImplementation((req, res) => {
            res.status(200).json([]);
        });

        const response = await request(app).get('/skillAssignments/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('should get a skill assignment by ID', async () => {
        // Mock the controller method if needed
        jest.spyOn(skillAssignmentController, 'getById').mockImplementation((req, res) => {
            res.status(200).json({ id: 1, skill: 'Test Skill' });
        });

        const response = await request(app).get('/skillAssignments/id/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, skill: 'Test Skill' });
    });

    it('should get skill assignments by skill', async () => {
        // Mock the controller method if needed
        jest.spyOn(skillAssignmentController, 'getBySkills').mockImplementation((req, res) => {
            res.status(200).json([{ id: 1, skill: 'Test Skill' }]);
        });

        const response = await request(app).get('/skillAssignments/skill/TestSkill');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, skill: 'Test Skill' }]);
    });

    it('should get skill assignments by staff name', async () => {
        // Mock the controller method if needed
        jest.spyOn(skillAssignmentController, 'getByStaff').mockImplementation((req, res) => {
            res.status(200).json([{ id: 1, firstname: 'John', surname: 'Doe' }]);
        });

        const response = await request(app).get('/skillAssignments/name/John/Doe');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, firstname: 'John', surname: 'Doe' }]);
    });

    it('should get all staff details', async () => {
        // Mock the controller method if needed
        jest.spyOn(skillAssignmentController, 'getAllStaffDetails').mockImplementation((req, res) => {
            res.status(200).json([{ id: 1, detail: 'Staff Detail' }]);
        });

        const response = await request(app).get('/skillAssignments/staffDetails');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, detail: 'Staff Detail' }]);
    });

    it('should create a new skill assignment', async () => {
        const newSkillAssignment = { skill: 'New Skill', staffId: 1 };
        // Mock the controller method if needed
        jest.spyOn(skillAssignmentController, 'create').mockImplementation((req, res) => {
            res.status(201).json(newSkillAssignment);
        });

        const response = await request(app).post('/skillAssignments/').send(newSkillAssignment);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(newSkillAssignment);
    });

    it('should update a skill assignment', async () => {
        const updatedSkillAssignment = { id: 1, skill: 'Updated Skill' };
        // Mock the controller method if needed
        jest.spyOn(skillAssignmentController, 'update').mockImplementation((req, res) => {
            res.status(200).json(updatedSkillAssignment);
        });

        const response = await request(app).put('/skillAssignments/').send(updatedSkillAssignment);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedSkillAssignment);
    });

    it('should delete a skill assignment', async () => {
        // Mock the controller method if needed
        jest.spyOn(skillAssignmentController, 'deleting').mockImplementation((req, res) => {
            res.status(204).end();
        });

        const response = await request(app).delete('/skillAssignments/').send({ id: 1 });
        expect(response.status).toBe(204);
    });
});
