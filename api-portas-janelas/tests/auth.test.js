const request = require('supertest');
const app = require('../server');
const User = require('../models/user');

describe('Auth Controller', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: '123456'
      });
    expect(res.statusCode).toEqual(201);
  });
});