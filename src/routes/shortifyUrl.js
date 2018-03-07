const { handleLongToShort } = require('../handlers/handleLongToShort');
const Models = require('../../models');

module.exports = [
  {
    method: 'POST',
    path: '/shortify',
    handler: (request, response) => {
      handleLongToShort(request.payload.longUrl).then((Url) => {
        response({
          shortUrl: `www.${Url.shortUrl}.com`,
          statusCode: 200,
        });
      })
        .catch(() => {
          response({
            data: {
              reason: 'Unable to retrieve url.',
            },
            statusCode: 500,
          });
        });
    },
  },
  {
    method: 'GET',
    path: '/shortify',
    handler: (request, response) => {
      Models.urls.findOne({ where: { shortUrl: request.query.shortUrl } })
        .then((urldata) => {
          response({
            shortUrl: urldata.longUrl,
            statusCode: 200,
          });
        })
        .catch(() => {
          response({
            data: {
              reason: 'Unable to find url.',
            },
            statusCode: 500,
          });
        });
    },
  },
];
