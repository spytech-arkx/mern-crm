const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Set the default logging level (can be adjusted based on needs)
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Include timestamps
    winston.format.printf((info) => `${info.timestamp} [${info.level}] ${info.message}`),
  ),
  transports: [
    new winston.transports.Console(), // Log to console for development
    new winston.transports.File({ filename: './app.log' }),
    // Add other transports for production environments, e.g., file, database
  ],
});

const colors = {
  200: '32',
  201: '32',
  204: '32',
  300: '36',
  302: '36',
  400: '35',
  404: '35',
  401: '33',
  403: '33',
  500: '31',
};

const requestLogger = (req, res, next) => {
  const startTime = process.hrtime(); // Record start time for request duration

  // Get color for HTTP method and status code
  logger.info(`HTTP${req.httpVersion} ${req.method} ${req.url}`);

  res.on('finish', () => {
    const statusCodeColor = colors[res.statusCode] || 'white';
    const durationInMs = process.hrtime(startTime)[0] * 1000 + process.hrtime(startTime)[1] / 1e6;
    logger.info(
      `> \x1b[${statusCodeColor}m${res.statusCode}\x1b[0m ${res.statusMessage} in ${durationInMs}ms\n`,
    );
  });
  next();
};

module.exports = {
  logger,
  requestLogger,
};
