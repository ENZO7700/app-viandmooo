
const { onRequest } = require('firebase-functions/v2/https');
const server = import('firebase-frameworks');
exports.server = onRequest(
  {
    region: 'us-central1',
    // CPU can be increased with a paid plan
    // cpu: 2,
  },
  async (request, response) => {
    return server.then((server) => server.handle(request, response));
  }
);
