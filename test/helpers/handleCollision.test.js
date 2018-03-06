
const { handleCollision } = require('../../src/helpers/handleCollision');
const Models = require('../../models');

beforeAll(done => Models.urls.destroy({ truncate: true }).then(done()));
afterAll(done => Models.urls.destroy({ truncate: true }).then(done()));

describe('function handleCollision', () => {
  it('should return short url of length 6', (done) => {
    handleCollision('www.someRandomUrlThatIsTooBigToRememberButShortTotest.com', 0, 6)
      .then((shortUrl) => {
        expect(shortUrl.length).toBe(6);
        done();
      });
  });
});
