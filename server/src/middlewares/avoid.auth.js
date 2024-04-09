const { verifyToken } = require('../helpers/jwt');

exports.avoidAuth = (req, res, next) => {
  try {
    const token = req.cookies.tokenAuth || null;
    if (!token) {
      return next();
    }
    const verify = verifyToken(token);
    if (!verify) {
      return next();
    }
    return res.status(200).json({ message: 'you are already logged' });
  } catch (err) {
    throw err;
  }
};
