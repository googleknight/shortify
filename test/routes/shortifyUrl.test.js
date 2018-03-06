const supertest = require('supertest');
const server = require('../../src/server/server');
const Models = require('../../models');


beforeEach(done => Models.urls.destroy({ truncate: true }).then(done()));
describe('Test shortify route', () => {
  it('should gives 200 as success code', (done) => {
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

  it('should makes an entry in database for a new long url', (done) => {
    supertest(server.listener)
      .post('/shortify')
      .send({
        longUrl: 'www.testinglongUrl.com',
      })
      .then((response) => {
        Models.urls.findOne({ where: { longUrl: 'www.testinglongUrl.com' } })
          .then((urldata) => {
            expect(`www.${urldata.shortUrl}.com`).toBe(response.body.shortUrl);
            done();
          })
          .catch((reason) => { throw reason; });
      });
  });
});
