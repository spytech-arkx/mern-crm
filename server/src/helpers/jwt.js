const jwt = require('jsonwebtoken');
require('dotenv').config();

// Not sure where it'll be imployed.
// For now, it's an email verificaton token, ;_;
// Not the intended use, but we'll figure it out.
// more at https://github.com/auth0/node-jsonwebtoken
exports.issueToken = (payload, options) => jwt.sign(payload, process.env.SECRET_KEY, options);
exports.verifyToken = (token) => jwt.verify(token, process.env.SECRET_KEY);
