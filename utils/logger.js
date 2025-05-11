const winston = require('winston');
const { combine, timestamp, printf, colorize } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message.trim());
  }
};

module.exports = logger;