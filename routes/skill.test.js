const request = require('supertest');
const express = require('express');
const app = require('../app'); // Import the Express app
const router = require('../routes/skill'); // Import the router

// Use a fresh instance of express app for testing
const testApp = express();
testApp.use(express.json());
testApp.use('/api/skill', router);

describe('Skill Router', () => {
  // Test GET /api/skill
  it('should respond with all skills', async () => {
    const response = await request(testApp).get('/api/skill');
    expect(response.status).toBe(200);
    // Add more assertions based on the expected response
  });

  // Test GET /api/skill/id/:id
  it('should respond with a skill by id', async () => {
    const skillId = 1; // Use an appropriate ID for testing
    const response = await request(testApp).get(`/api/skill/id/${skillId}`);
    expect(response.status).toBe(200);
    // Add more assertions based on the expected response
  });

  // Test GET /api/skill/description/:description
  it('should respond with skills by description', async () => {
    const description = 'Sample Skill Description'; // Use a valid description for testing
    const response = await request(testApp).get(`/api/skill/description/${description}`);
    expect(response.status).toBe(200);
    // Add more assertions based on the expected response
  });

  // Test GET /api/skill/category/:category_id
  it('should respond with skills by category', async () => {
    const categoryId = 1; // Use an appropriate category ID for testing
    const response = await request(testApp).get(`/api/skill/category/${categoryId}`);
    expect(response.status).toBe(200);
    // Add more assertions based on the expected response
  });

  // Test POST /api/skill
  it('should create a new skill', async () => {
    const newSkill = {
      description: 'New Skill Description',
      // Add other fields required for creation
    };
    const response = await request(testApp).post('/api/skill').send(newSkill);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newSkill);
  });

  // Test PUT /api/skill
  it('should update a skill', async () => {
    const updatedSkill = {
      id: 1, // Use an appropriate ID for testing
      description: 'Updated Skill Description',
      // Add other fields required for update
    };
    const response = await request(testApp).put('/api/skill').send(updatedSkill);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedSkill);
  });

  // Test DELETE /api/skill
  it('should delete a skill', async () => {
    const skillId = 1; // Use an appropriate ID for testing
    const response = await request(testApp).delete('/api/skill').send({ id: skillId });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Skill deleted');
  });
});
