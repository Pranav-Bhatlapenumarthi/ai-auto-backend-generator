javascript
const request = require('supertest');
const app = require('../app');
const db = require('../db');
const User = require('../models/User');

describe('Users API', () => {
  beforeEach(async () => {
    await db.sync({ force: true });
  });

  afterAll(async () => {
    await db.close();
  });

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'John Doe', email: 'john@example.com' });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('John Doe');
    expect(response.body.email).toBe('john@example.com');
  });

  it('should get all users', async () => {
    await User.create({ name: 'John Doe', email: 'john@example.com' });
    await User.create({ name: 'Jane Doe', email: 'jane@example.com' });

    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it('should get a user by id', async () => {
    const user = await User.create({ name: 'John Doe', email: 'john@example.com' });

    const response = await request(app).get(`/users/${user.id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('John Doe');
    expect(response.body.email).toBe('john@example.com');
  });

  it('should update a user', async () => {
    const user = await User.create({ name: 'John Doe', email: 'john@example.com' });

    const response = await request(app)
      .put(`/users/${user.id}`)
      .send({ name: 'Jane Doe', email: 'jane@example.com' });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Jane Doe');
    expect(response.body.email).toBe('jane@example.com');
  });

  it('should delete a user', async () => {
    const user = await User.create({ name: 'John Doe', email: 'john@example.com' });

    const response = await request(app).delete(`/users/${user.id}`);

    expect(response.status).toBe(204);
  });
});