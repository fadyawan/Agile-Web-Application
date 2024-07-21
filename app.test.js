const request = require('supertest');
const express = require('express');
const app = require('./app'); 

describe('Express App', () => {
  it('should respond with 404 for unknown endpoints', async () => {
    const response = await request(app).get('/unknown-endpoint');
    expect(response.status).toBe(400);
    expect(response.text).toContain('End point not recognised');
  });

  it('should have helmet middleware set up', async () => {
    const response = await request(app).get('/api/skillAssignment'); 
    expect(response.status).toBe(200);


    expect(response.headers['x-content-type-options']).toBe('nosniff');
    expect(response.headers['x-frame-options']).toBe('DENY');
    expect(response.headers['x-xss-protection']).toBe('0');
    expect(response.headers['strict-transport-security']).toContain('max-age=31536000');
  });

  it('should respond correctly to skillAssignment route', async () => {
    const response = await request(app).get('/api/skillAssignment');
    expect(response.status).toBe(200); 
  });

  it('should respond correctly to skillCategory route', async () => {
    const response = await request(app).get('/api/skillCategory'); 
    expect(response.status).toBe(200); 
  });

  it('should respond correctly to skill route', async () => {
    const response = await request(app).get('/api/skill'); 
    expect(response.status).toBe(200);
  });

  it('should respond correctly to user route', async () => {
    const response = await request(app).get('/api/user'); 
    expect(response.status).toBe(200); 
  });

  it('should respond correctly to staffAssignment route', async () => {
    const response = await request(app).get('/api/staffAssignment'); 
    expect(response.status).toBe(200);
  });

  it('should respond correctly to skillLevel route', async () => {
    const response = await request(app).get('/api/skillLevel'); 
    expect(response.status).toBe(200); 
  });

  it('should respond correctly to systemrole route', async () => {
    const response = await request(app).get('/api/systemRole'); 
    expect(response.status).toBe(200); 
  });
});
