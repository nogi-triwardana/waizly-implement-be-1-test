const winston = require('winston');

const { combine, timestamp, json, printf } = winston.format;
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

const httpLogger = winston.createLogger({
  format: combine(
    timestamp({ format: timestampFormat }),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      const response = {
        level,
        message,
        data, // metadata
      };

      return JSON.stringify(response);
    })
  ),
  transports: [
    new winston.transports.Console(),
  ]
});

module.exports = httpLogger;