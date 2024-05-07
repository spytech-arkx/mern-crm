// for both authentication and authorization routes
// To not clutter users routes and separate concerns
const express = require("express");
const passport = require("passport");
const handleError = require("../lib/errorHandler");
const { issueToken } = require("../lib/jwt");
require('dotenv').config();

const authRouter = express.Router();

authRouter.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return handleError(err);
    return res.redirect("/");
  });
});

authRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: "Forbidden",
  }),
  (req, res) => {
    req.login(req.user, (err) => {
      if (err) return handleError(err);
      return res
        .status(200)
        .json({ type: "Authenticated", message: "Login successful!" });
    });
  },
);

authRouter.post("/app", (req, res) => {
  const { clientId, clientSecret } = req.body;
  if (!clientId || !clientSecret) return res.status(400).send('Bad request.');
  if (clientId !== process.env.CLIENT_ID && clientSecret !== process.end.CLIENT_SECRET) {
    return res.status(401).json({ type: "Unauthorized", message: "Invalid credentials." });
  }
  try {
    const token = issueToken({ info: "snazAPI/v1/ api key, expires in two weeks." }, {
      expiresIn: "15d",
    });
    return res.json({ access_token: token });
  } catch (err) {
    return handleError(err, res);
  }
});

module.exports = authRouter;
