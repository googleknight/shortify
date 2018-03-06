const { longToShort } = require('../../src/helpers/longToShort');

describe('The return type of longToShort ', () => {
  it('must return String:', () => {
    expect(typeof longToShort('www.randomurls.com', 0, 6)).toBe('string');
  });

  it('length must be 6:', () => {
    expect(longToShort('www.randomurls.com', 0, 6).length).toBe(6);
  });
});

