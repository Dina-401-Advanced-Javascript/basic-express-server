'use strict';

const { server } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('web server tests', () => {
  it('Should respond with 404 status on an invalid route', () => {
    return mockRequest
      .get('/blah')
      .then(result => {
        expect(result.status).toBe(404);
      })
      .catch(err => console.error(err));
  })

  it('Should respond with 404 status on bad method', () => {
    return mockRequest
      .put('/blah')
      .then(result => {
        expect(result.status).toBe(404);
      })
      .catch(err => console.error(err));
  })

  it('Should respond with 500 if no name on query string', () => {
    return mockRequest
      .get('/person')
      .then(result => {
        expect(result.status).toBe(500);
      })
      .catch(err => console.error(err));
  })

  it('Should respond with 200 if name is given in the query string', () => {
    return mockRequest
      .get('/person?name=dina')
      .then(result => {
        expect(result.status).toBe(200);
      })
      .catch(err => console.error(err));
  })

  it('Should respond with 200 if name is given in the query string', () => {
    return mockRequest
      .get('/person?name=dina')
      .then(result => {
        expect(result.body).toStrictEqual({ name : 'dina' });
      })
      .catch(err => console.error(err));
  })
});
