const jwt = require('jsonwebtoken');

exports.generateToken = (data) => {
  return jwt.sign(data, process.env.jwtKey, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.jwtKey);
};
