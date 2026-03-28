javascript
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

describe('Users API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      })
      .expect(201);

    const user = await User.findOne({ email: 'john@example.com' });
    expect(user).toBeTruthy();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
    expect(bcrypt.compareSync('password123', user.password)).toBe(true);
  });

  it('should not create a new user with invalid email', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123',
      })
      .expect(400);

    expect(response.body.message).toBe('Invalid email');
  });

  it('should not create a new user with weak password', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'weak',
      })
      .expect(400);

    expect(response.body.message).toBe('Password must be at least 8 characters long');
  });

  it('should get all users', async () => {
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: bcrypt.hashSync('password123', 10),
    });

    const user2 = await User.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: bcrypt.hashSync('password123', 10),
    });

    const response = await request(app)
      .get('/api/users')
      .expect(200);

    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe('John Doe');
    expect(response.body[0].email).toBe('john@example.com');
    expect(response.body[1].name).toBe('Jane Doe');
    expect(response.body[1].email).toBe('jane@example.com');
  });

  it('should get a user by id', async () => {
    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: bcrypt.hashSync('password123', 10),
    });

    const response = await request(app)
      .get(`/api/users/${user._id}`)
      .expect(200);

    expect(response.body.name).toBe('John Doe');
    expect(response.body.email).toBe('john@example.com');
  });

  it('should update a user', async () => {
    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: bcrypt.hashSync('password123', 10),
    });

    const response = await request(app)
      .patch(`/api/users/${user._id}`)
      .send({
        name: 'Jane Doe',
        email: 'jane@example.com',
      })
      .expect(200);

    expect(response.body.name).toBe('Jane Doe');
    expect(response.body.email).toBe('jane@example.com');
  });

  it('should delete a user', async () => {
    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: bcrypt.hashSync('password123', 10),
    });

    await request(app)
      .delete(`/api/users/${user._id}`)
      .expect(204);

    const deletedUser = await User.findById(user._id);
    expect(deletedUser).toBeNull();
  });
});