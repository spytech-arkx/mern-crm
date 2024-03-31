const winston = require('winston'); // Assuming use of a popular logging library like Winston
require('dotenv').config('../../.env');

const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    timestamp: 7
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    format : 'yellow'
  }
};

winston.addColors(config.colors);

const logger = winston.createLogger({
  level: 'info', // Set the default logging level (can be adjusted based on needs)
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Include timestamps
    winston.format.printf((info) => `${info.timestamp} [${info.level}] ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(), // Log to console for development
    // Add other transports for production environments, e.g., file, database
    // new winston.transports.File({ filename: 'app.log' }),
  ],
});

module.exports = (req, res, next) => {
  logger.info(`HTTP ${req.method} ${req.url} ${res.statusCode}`);
  // Optionally log request body and other details as needed
  // logger.info(`Request body: ${JSON.stringify(req.body)}`);

  res.on('finish', () => {
    logger.info(`Response sent: ${res.statusCode} ${res.statusMessage}`);
    // logger.info(`Response body: ${JSON.stringify(res.body)}`);
  });

  next();
};
