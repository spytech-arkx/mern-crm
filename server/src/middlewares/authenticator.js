/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable consistent-return */
/* eslint-disable eol-last */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { extractFromAuthHeaderWithScheme, verifyToken } = require('../lib/jwt');
const { logger } = require('../utils/logger');
const handleError = require('../lib/errorHandler');

const authenticator = async (req, res, next) => {
  try {
    // verify authentication
    const { authorization } = req.headers;
    if (!authorization) {
      // eslint-disable-next-line object-curly-spacing
      return res.status(401).json({ error: 'authorization token required' });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Invalid token format' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    const user = await User.findById(userId).select(`_id verified role`);

    if (!user) {
      return res.status(401).json({ error: `User not found` });
    }

    if (!user.verified) {
      return res.status(403).json({ error: 'please verify your account for access' });
    }
    req.user = user;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(401).json({ error: 'request not authorized' });
  }
};

const permission = (role) => (req, res, next) => {
  if (req.user.role === role) {
    next(); // Si le rôle de l'utilisateur correspond, passez à la prochaine fonction de middleware
  } else {
    return res.status(403).json({ error: 'Not allowed' }); // Sinon, renvoyez une erreur d'autorisation
  }
};
module.exports = { authenticator, permission };

// ↑↑ JWT based auth + A shot at RBAC.
// ↓↓ Session based auth (Passport)

module.exports.isAuth = (req, res, next) => {

  // User authentication
  if (req.isAuthenticated()) return next();

  // App authentication
  const token = extractFromAuthHeaderWithScheme(req);
  if (!token) return res.status(401).json({ msg: 'Invalid credentials.' });

  try {
    const verified = verifyToken(token);
    req.api = verified && next();
  } catch (err) {
    handleError(err, res)
  }
};
