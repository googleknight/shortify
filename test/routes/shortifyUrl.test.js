const supertest = require('supertest');
const server = require('../../src/server/server');
const Models = require('../../models');


describe('Test POST shortify route', () => {
  beforeEach(done => Models.urls.destroy({ truncate: true }).then(done()));
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


describe('Test GET shortify route', () => {
  beforeEach(done => Models.urls.create({ longUrl: 'www.somelonglongurl.com', shortUrl: 'asdasd' }).then(done()));
  afterEach(done => Models.urls.destroy({ where: { longUrl: 'www.somelonglongurl.com', shortUrl: 'asdasd' } }).then(done()));
  it('should gives 200 as success code', (done) => {
    supertest(server.listener)
      .get('/shortify?shortUrl=asdasd')
      .then((response) => {
        expect(response.body.statusCode).toBe(200);
        done();
      })
      .catch((reason) => { throw reason; });
  });

  it('should reads from database for a short url', (done) => {
    supertest(server.listener)
      .get('/shortify?shortUrl=asdasd')
      .then((response) => {
        expect(response.body.longUrl).toBe('www.somelonglongurl.com');
        done();
      })
      .catch((reason) => { throw reason; });
  });
});
