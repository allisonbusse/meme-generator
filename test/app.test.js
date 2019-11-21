require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/model/User');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can signup a new user', () => {
    return request(app)
      .post('/api/auth/signup')
      .send({ username: 'test', password: 'password1234' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'test'
        });
      });
  });

  it('can signin a user', async() => {
    await User.create({ username: 'test', password: '1234' });
    const res = await request(app)
      .post('/api/auth/signin')
      .send({ username: 'test', password: '1234' });
    
    expect(res.body).toEqual({
      _id: expect.any(String),
      username: 'test'
    });
  });

  it('errors signin a user when a bad password is provided', async() => {
    await User.create({ username: 'test', password: '1234' });
    const res = await request(app)
      .post('/api/auth/signin')
      .send({ username: 'test', password: 'abcd' });
    
    expect(res.status).toEqual(401);
    expect(res.body).toEqual({
      status: 401,
      message: 'Invalid username/password'
    });
  });

  it('errors signin a user when a bad username is provided', async() => {
    await User.create({ username: 'test', password: '1234' });
    const res = await request(app)
      .post('/api/auth/signin')
      .send({ username: 'me', password: '1234' });
    
    expect(res.status).toEqual(401);
    expect(res.body).toEqual({
      status: 401,
      message: 'Invalid username/password'
    });
  });
});
