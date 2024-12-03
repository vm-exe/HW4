import request from 'supertest';
import app from '../../apps/server/src/app';

describe('GET /api/products', () => {
  it('responds with a list of products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
