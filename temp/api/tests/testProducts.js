javascript
const request = require('supertest');
const app = require('../app');
const db = require('../db');

beforeAll(async () => {
  await db.connect();
});

afterAll(async () => {
  await db.close();
});

describe('GET /products', () => {
  it('should return a list of products', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /products/:id', () => {
  it('should return a product by id', async () => {
    const response = await request(app).get('/products/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('price');
  });

  it('should return 404 if product not found', async () => {
    const response = await request(app).get('/products/999');
    expect(response.status).toBe(404);
  });
});

describe('POST /products', () => {
  it('should create a new product', async () => {
    const product = { name: 'Test Product', price: 10.99 };
    const response = await request(app).post('/products').send(product);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', product.name);
    expect(response.body).toHaveProperty('price', product.price);
  });

  it('should return 400 if product data is invalid', async () => {
    const product = { name: 'Test Product' };
    const response = await request(app).post('/products').send(product);
    expect(response.status).toBe(400);
  });
});

describe('PUT /products/:id', () => {
  it('should update a product', async () => {
    const product = { name: 'Updated Product', price: 12.99 };
    const response = await request(app).put('/products/1').send(product);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', product.name);
    expect(response.body).toHaveProperty('price', product.price);
  });

  it('should return 404 if product not found', async () => {
    const product = { name: 'Updated Product', price: 12.99 };
    const response = await request(app).put('/products/999').send(product);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /products/:id', () => {
  it('should delete a product', async () => {
    const response = await request(app).delete('/products/1');
    expect(response.status).toBe(204);
  });

  it('should return 404 if product not found', async () => {
    const response = await request(app).delete('/products/999');
    expect(response.status).toBe(404);
  });
});