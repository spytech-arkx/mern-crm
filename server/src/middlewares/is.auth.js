const { verifyToken } = require('../helpers/jwt');
const handleError = require('../helpers/errorHandler');
exports.isAuth = (req, res, next) => {
  try {
    const token = req.cookies.tokenAuth || null;
    if (!token) {
      return res.status(200).json({
        message: 'you are not Logged in',
      });
    }
    const verify = verifyToken(token);
    if (verify) {
      return next();
    } else {
      return res.status(200).json({
        message: 'This token is not valid',
      });
    }
  } catch (err) {
    handleError(err, res);
  }
};
