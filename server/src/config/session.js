const session = require('express-session');
const MongoStore = require('connect-mongo');
const connection = require('./db');
require('dotenv').config();

module.exports = session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongoUrl: process.env.MONGODB_URI,
    mongooseConnection: connection,
    collectionName: 'sessions',
  }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  },
});

// TODO: implement session info.
