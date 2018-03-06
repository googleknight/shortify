const md5 = require('md5');

function longToShort(longUrl, first, last) {
  return md5(longUrl).slice(first, last);
}
module.exports = { longToShort };
