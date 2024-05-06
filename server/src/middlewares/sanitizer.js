const xss = require('xss');

const sanitizeString = (value) => xss(value);

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
  if (Array.isArray(req.body)) {
    const arr = req.body;
    req.body = arr.map((obj) => sanitizeObject(obj));
    return next();
  }
  req.body = sanitizeObject(req.body);
  return next();
};

module.exports = sanitizeBodyData;
