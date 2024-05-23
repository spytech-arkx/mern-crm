const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");

const local = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: "Incorrect Email." });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: "Incorrect Password." });

      delete user.password;
      delete user.__v;

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.use(local);
passport.serializeUser((user, done) => {
  user.password = "hidden"; // call me lazy.
  done(null, user);
});
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});
