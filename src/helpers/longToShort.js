const crypto = require('crypto');


function longToShort(longUrl, first, last) {
  return crypto.createHash('md5').update(longUrl).digest('base64').replace(/\//g, '_')
    .slice(first, last);
}
module.exports = { longToShort };
