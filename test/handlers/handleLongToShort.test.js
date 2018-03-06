const { handleLongToShort } = require('../../src/handlers/handleLongToShort');
const Models = require('../../models');

beforeAll(done => Models.urls.destroy({ truncate: true }).then(done()));
afterAll(done => Models.urls.destroy({ truncate: true }).then(done()));


describe('function handleToShort', () => {
  it('should return short url of length 6', (done) => {
    handleLongToShort('www.someRandomUrlThatIsTooBigToRememberButShortTotest.com')
      .then((urldata) => {
        expect(urldata.shortUrl.length).toBe(6);
        done();
      });
  });

  it('should return same short url for same long url', (done) => {
    handleLongToShort('www.someRandomUrl.com')
      .then((urldata1) => {
        handleLongToShort('www.someRandomUrl.com')
          .then((urldata2) => {
            expect(urldata1.shortUrl).toBe(urldata2.shortUrl);
            done();
          });
      });
  });
});
