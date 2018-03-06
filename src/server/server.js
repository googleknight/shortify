const Hapi = require('hapi');
const Routes = require('../routes');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8080,
});
server.route(Routes);
if (!module.parent) {
  server.start(() => {
    console.log('Server started');
  });
}
module.exports = server;
