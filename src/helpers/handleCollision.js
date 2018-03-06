const Models = require('../../models');
const shortifyObj = require('../helpers/longToShort');

function handleCollision(longUrl, initial, final) {
  const shortUrl = shortifyObj.longToShort(longUrl, initial, final);
  return Models.urls.findOne({
    where: {
      shortUrl,
    },
  }).then((shortUrlDb) => {
    if (shortUrlDb === null || shortUrlDb.shortUrl !== shortUrl) return shortUrl;
    else if (final < 31) { return handleCollision(longUrl, initial + 1, final + 1); }
    return null;
  });
}

module.exports = { handleCollision };
