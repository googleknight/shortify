const { handleLongToShort } = require('../../src/handlers/handleLongToShort');
const Sinon = require('sinon');
const shortifyObj = require('../../src/helpers/longToShort');
const Models = require('../../models');

beforeEach(done => Models.urls.destroy({ truncate: true }).then(done()));


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
  it('should recurse and insert if there is a collision in MD5', (done) => {
    const url1 = 'this is string 1';
    const url2 = 'this is string 2';
    const stub = Sinon.stub(shortifyObj, 'longToShort');
    stub.withArgs(url1, 0, 6).returns('123456');
    stub.withArgs(url2, 0, 6).returns('123456');
    stub.withArgs(url2, 1, 7).returns('ghijkl');

    handleLongToShort(url1)
      .then(() => {
        handleLongToShort(url2).then((result2) => {
          expect(result2.shortUrl).toBe('ghijkl');
          Models.urls.findAll({
            where: {
              shortUrl: result2.shortUrl,
            },
          }).then((searchResult) => {
            expect(searchResult.length).toBe(1);
            stub.restore();
            done();
          });
        });
      });
  });
});
