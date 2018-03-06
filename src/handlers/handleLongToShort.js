const Models = require('../../models');
const { handleCollision } = require('../helpers/handleCollision');

function handleLongToShort(longUrl) {
  return Models.urls.findOne({
    where: {
      longUrl,
    },
  }).then((urldata) => {
    if (urldata === null) {
      return handleCollision(longUrl, 0, 6)
        .then(shortUrl => Models.urls.create({
          longUrl,
          shortUrl,
        }));
    }
    return urldata;
  });
}

module.exports = { handleLongToShort };
