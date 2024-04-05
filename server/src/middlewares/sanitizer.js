const xss = require('xss');

function sanitizeString(value) {
  return xss(value);
}

const sanitizeObject = (obj) => {
  const sanitizedObj = {};
  Object.keys(obj).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value === 'object' && value !== null) {
        sanitizedObj[key] = sanitizeObject(value);
      } else {
        sanitizedObj[key] = sanitizeString(value);
      }
    }
  });
  return sanitizedObj;
};

const sanitizeBodyData = (req, res, next) => {
  req.body = sanitizeObject(req.body);
  next();
};

module.exports = sanitizeBodyData;