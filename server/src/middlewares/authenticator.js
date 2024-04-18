module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(403).json({ type: 'Forbidden', msg: 'Invalid credentials.' });
};
