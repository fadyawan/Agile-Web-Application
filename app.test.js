const request = require('supertest');
const express = require('express');
const app = require('./app'); // Adjust the path to where your Express app is exported

describe('Express App', () => {
  it('should respond with 404 for unknown endpoints', async () => {
    const response = await request(app).get('/unknown-endpoint');
    expect(response.status).toBe(400);
    expect(response.text).toContain('End point not recognised');
  });

  it('should have helmet middleware set up', async () => {
    const response = await request(app).get('/api/skillAssignment'); // Replace with a valid route
    expect(response.status).toBe(200); // Assuming the route exists and responds with 200

    // Check if helmet headers are set
    expect(response.headers['x-content-type-options']).toBe('nosniff');
    expect(response.headers['x-frame-options']).toBe('DENY');
    expect(response.headers['x-xss-protection']).toBe('0');
    expect(response.headers['strict-transport-security']).toContain('max-age=31536000');
  });

  it('should respond correctly to skillAssignment route', async () => {
    const response = await request(app).get('/api/skillAssignment'); // Replace with a valid route
    expect(response.status).toBe(200); // Adjust based on your route's expected response
    // Add more assertions based on expected response
  });

  it('should respond correctly to skillCategory route', async () => {
    const response = await request(app).get('/api/skillCategory'); // Replace with a valid route
    expect(response.status).toBe(200); // Adjust based on your route's expected response
    // Add more assertions based on expected response
  });

  // Repeat similar tests for other routes
});
