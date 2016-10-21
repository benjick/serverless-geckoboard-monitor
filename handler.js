const fetch = require('node-fetch');

module.exports.hello = (event, context, callback) => {
  const qs = event.queryStringParameters || event.query;
  if (!qs || !qs.domain) {
    callback(null, error('No domain specified'));
    return;
  }
  const hostname = qs.domain;
  const prefix = qs.prefix ? 'https://' : 'http://';
  const startTime = (new Date()).getTime();
  fetch(prefix + hostname)
  .then(() => {
    const response = createResponse({
      status: 'Up',
      responseTime: (new Date()).getTime() - startTime,
    });
    callback(null, response);
  })
  .catch(() => {
    const response = createResponse({
      status: 'Down',
    });
    callback(null, response);
  });
};

function createResponse(object) {
  return {
    statusCode: 200,
    body: JSON.stringify(object),
  };
}

function error(message) {
  return {
    statusCode: 500,
    message,
  };
}
