const Hapi = require('hapi');
const Routes = require('../routes');
const Good = require('good');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8080,
});
server.register({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*',
        }],
      }, {
        module: 'good-console',
      }, 'stdout'],
    },
  },
}, (err) => {
  if (err) {
    throw err;
  }
});
server.route(Routes);
if (!module.parent) {
  server.start(() => {
    console.log('Server started');
  });
}
module.exports = server;
