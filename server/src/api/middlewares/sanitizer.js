const xss = require('xss');

const sanitize = (req, res, next) => {
  const sanitized = {};
  for (const key in req.body) {
    if (Object.prototype.hasOwnProperty.call(req.body, key)) {
      const value = req.body[key];
      // Check if the value is an object
      if (typeof value === 'object' && value !== null) {
        // If it's an object, recursively sanitize it
        sanitized[key] = sanitize(value);
      } else {
        // If it's not an object, sanitize the value
        sanitized[key] = xss(value);
      }
    }
  }
  req.body = sanitized;
  next();
};

module.exports = sanitize;
