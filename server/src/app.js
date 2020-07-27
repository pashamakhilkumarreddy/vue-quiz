const express = require('express');
const cors = require('express');
const helmet = require('helmet');
const compression = require('compression');
const responseTime = require('response-time');
const rateLimit = require('express-rate-limit');

const app = express();

app.use(cors())
  .use(helmet())
  .use(compression())
  .use(responseTime())
  .use(rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 1200,
  }));

const PORT = 6000;

app.listen(PORT, () => {
  console.info(`The application is up and running on ${PORT}`);
});
