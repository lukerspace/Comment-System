// npm i helmet
// npm i compression
const helmet = require("helmet");
const compression = require("compression");

module.exports = function (app) {
  app.use(helmet());
  app.use(compression());
};

// HEROKU -V
// heruko login
// password

// export HTTP_PROXY=http://proxy.server.com:1234
