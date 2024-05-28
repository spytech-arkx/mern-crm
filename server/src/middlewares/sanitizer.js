const xss = require("xss");

const sanitizeString = (value) => xss(value);

const sanitizeValue = (value) => {
  if (typeof value === "string") {
    return sanitizeString(value);
    // eslint-disable-next-line no-else-return
  } else if (Array.isArray(value)) {
    // Deeply sanitize array elements
    return value.map(sanitizeValue);
  } else if (value !== null && typeof value === "object") {
    // Recursively sanitize object properties
    const sanitizedObj = {};
    Object.keys(value).forEach((key) => {
      sanitizedObj[key] = sanitizeValue(value[key]);
    });
    return sanitizedObj;
  }
  // Handle other data types or return as-is (optional customization)
  return value;
};
/**
 * Basic sanitazion for the req.body, powered by xss
 * Handles nested objects, arrays..
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const sanitizeBodyData = (req, res, next) => {
  req.body = sanitizeValue(req.body);
  next();
};

module.exports = sanitizeBodyData;
