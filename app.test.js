const request = require('supertest');
const app = require('../src/app');

describe('Aplicação', () => {
  test('GET /health retorna status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET / retorna a página inicial', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});
