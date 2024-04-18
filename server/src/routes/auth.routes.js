// for both authentication and authorization routes
// To not clutter users routes and separate concerns
const express = require('express');
const passport = require('passport');
const handleError = require('../helpers/errorHandler');

const authRouter = express.Router();

authRouter.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return handleError(err);
    return res.redirect('/');
  });
});

authRouter.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: 'Forbidden' }),
  (req, res) => {
    req.login(req.user, (err) => {
      if (err) return handleError(err);
      return res
        .status(200)
        .json({ type: 'Authenticated', message: 'Login successful!' });
    });
  },
);

// **Development Notes**
// passport.authenticate options may change further in development, for reference:
//    - `session`          Save login state in session, defaults to `true`.
//    - `successRedirect`  After successful login, redirect to given URL.
//    - `successMessage`   True to store success message in
//                         `req.session.messages`, or a string to use as override
//                         message for success.
//    - `successFlash`     True to flash success messages or a string to use as a flash
//                         message for success (overrides any from the strategy itself).
//    - `failureRedirect`  After failed login, redirect to given URL.
//    - `failureMessage`   True to store failure message in
//                         `req.session.messages`, or a string to use as override
//                         message for failure.
//    - `failureFlash`     True to flash failure messages or a string to use as a flash
//                         message for failures (overrides any from the strategy itself).
//    - `assignProperty`   Assign the object provided by the verify callback to given property.
//
//  An optional `callback` can be supplied to allow the application to override
//  the default manner in which authentication attempts are handled.  The
//  callback has the following signature, where `user` will be set to the
//  authenticated user on a successful authentication attempt, or `false`
//  otherwise.  An optional `info` argument will be passed, containing additional
//  details provided by the strategy's verify callback - this could be information about
//  a successful authentication or a challenge message for a failed authentication.
//  An optional `status` argument will be passed when authentication fails - this could
//  be a HTTP response code for a remote authentication failure or similar.
//
//      app.get('/protected', function(req, res, next) {
//        passport.authenticate('local', function(err, user, info, status) {
//          if (err) { return next(err) }
//          if (!user) { return res.redirect('/signin') }
//          res.redirect('/account');
//        })(req, res, next);
//      });
//
//  Note that if a callback is supplied, it becomes the application's
//  responsibility to log-in the user, establish a session, and otherwise perform
//  the desired operations.

module.exports = authRouter;
