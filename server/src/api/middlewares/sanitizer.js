const xss = require('xss');

const sanitizeString = (value) => {
  return xss(value);
};

const sanitizeObject = (obj) => {
  const sanitizedObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) { // make sure is isn't inherited, toString can break the code
      const value = obj[key];
      sanitizedObj[key] = typeof value === 'object' && value !== null ? sanitizeObject(value) : sanitizeString(value);
    }
  }
  return sanitizedObj;
};

const sanitize = (req, res, next) => {
  req.body = sanitizeObject(req.body);
  next();
};

module.exports = sanitize;
