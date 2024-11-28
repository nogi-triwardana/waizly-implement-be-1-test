const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');

describe('GET /employee', () => {
  let token;

  beforeAll(() => {

    token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);
  });

  it('should fetch list employees if it exists', async () => {
    const response = await request(app)
      .get('/api/v1/employee')
      .set('Authorization', `Bearer ${token}`)
      
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /employee/:id', () => {
  let token;
  let employeeId = 1;

  beforeAll(() => {

    token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);
  });

  it('should fetch a employee if it exists', async () => {
    const response = await request(app)
      .get(`/api/v1/employee/${employeeId}`)
      .set('Authorization', `Bearer ${token}`)
      
    expect(response.statusCode).toBe(200);
  });
});

describe('POST /employee', () => {
  let token;
  const payload = { 
    name: `employee-${Math.random(0,100).toFixed(2)}`,
    job_title: `Developer`,
    salary: 3000,
    departement: 'IT',
  };
  
  beforeAll(() => {
    token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);
  });

  it('should successfully create a employee', async () => {
    const response = await request(app)
      .post('/api/v1/employee')
      .set('Authorization', `Bearer ${token}`)
      .send(payload);
    expect(response.statusCode).toBe(200);
  });
});

describe('PUT /employee/:id', () => {
  let token;
  let employeeId = 2;
  const payload = { 
    name: `employee-${Math.random(0,100).toFixed(2)}`,
    job_title: `Developer`,
    salary: 3000,
    departement: 'IT',
  };
  
  beforeAll(() => {
    token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);
  });

  it('should successfully edit a employee', async () => {
    const response = await request(app)
      .put(`/api/v1/employee/${employeeId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(payload);
    expect(response.statusCode).toBe(200);
  });
});

describe('DELETE /employee/:id', () => {
  let token;
  let employeeId = 2;
  
  beforeAll(() => {
    token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);
  });

  it('should successfully delete a employee', async () => {
    const response = await request(app)
      .delete(`/api/v1/employee/${employeeId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200);
  });
});
