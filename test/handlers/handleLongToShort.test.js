const { handleLongToShort } = require('../../src/handlers/handleLongToShort');

describe('function handleToShort', () => {
  it('should return short url of length 6', (done) => {
    handleLongToShort('www.someRandomUrlThatIsTooBigToRememberButShortTotest.com')
      .then((urldata) => {
        expect(urldata.shortUrl.length).toBe(6);
        done();
      });
  });
});
