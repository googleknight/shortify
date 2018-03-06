const supertest = require('supertest');
const server = require('../../src/server/server');

describe('Test POST with supertest', () => {
  it('should POST JSON', (done) => {
    supertest(server.listener)
      .post('/shortify')
      .send({
        longUrl: 'www.qwertyuiop.com',
      })
      .then((response) => {
        expect(response.body.statusCode).toBe(200);
        done();
      })
      .catch((reason) => { throw reason; });
  });
});
