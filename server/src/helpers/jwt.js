const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.generateToken = (data) => {
  return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};
