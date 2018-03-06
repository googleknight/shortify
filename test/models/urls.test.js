const Models = require('../../models');

describe('validations', () => {
  beforeEach((done) => {
    Models.urls.truncate().then(() => {
      done();
    });
  });
  it('should not allow more than 6 characters in the code', (done) => {
    const createPromise = Models.urls.create({ shortUrl: 'qweqweq', longUrl: 'www.sahbdaksh.com' });
    createPromise.catch((error) => {
      expect(error.message).toBe('value too long for type character varying(6)');
      done();
    });
  });
});
