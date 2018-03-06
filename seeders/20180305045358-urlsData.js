const { longToShort } = require('../src/helpers/longToShort');
const cuid = require('cuid');

const dataset = {}; let longUrl;
for (let i = 0; i < 1e6; i += 1) {
  longUrl = `www.${cuid()}.com/${cuid()}`;
  let initial = 0;
  while (dataset[longToShort(longUrl, initial, initial + 6)]) {
    initial += 1;
  }
  const shortUrl = longToShort(longUrl, initial, initial + 6);
  dataset[shortUrl] = {
    longUrl,
    shortUrl,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('urls', Object.values(dataset)),

  down: (queryInterface) => {
    queryInterface.dropTable('urls');
  },
};
