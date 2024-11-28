const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');

describe('GET /sales', () => {
  let token;

  beforeAll(() => {
    token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);
  });

  it('should fetch list sales if it exists', async () => {
    const response = await request(app)
      .get('/api/v1/sales')
      .set('Authorization', `Bearer ${token}`)
      
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /sales/:id', () => {
  let token;
  let salesId = 1;

  beforeAll(() => {

    token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);
  });

  it('should fetch a sales if it exists', async () => {
    const response = await request(app)
      .get(`/api/v1/sales/${salesId}`)
      .set('Authorization', `Bearer ${token}`)
      
    expect(response.statusCode).toBe(200);
  });
});

describe('POST /sales', () => {
  let token;
  const payload = { 
    employee_id: 3,
    sales: 3000,
  };
  
  beforeAll(() => {
    token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);
  });

  it('should successfully create a sales', async () => {
    const response = await request(app)
      .post('/api/v1/sales')
      .set('Authorization', `Bearer ${token}`)
      .send(payload);
    expect(response.statusCode).toBe(200);
  });
});

describe('PUT /sales/:id', () => {
  let token;
  let salesId = 2;
  const payload = { 
    employee_id: 2,
    sales: 3000,
  };
  
  beforeAll(() => {
    token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);
  });

  it('should successfully edit a sales', async () => {
    const response = await request(app)
      .put(`/api/v1/sales/${salesId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(payload);
    expect(response.statusCode).toBe(200);
  });
});

describe('DELETE /sales/:id', () => {
  let token;
  let salesId = 2;
  
  beforeAll(() => {
    token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);
  });

  it('should successfully delete a sales', async () => {
    const response = await request(app)
      .delete(`/api/v1/sales/${salesId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200);
  });
});
