const { handleLongToShort } = require('../handlers/handleLongToShort');

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
];
