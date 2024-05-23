const session = require("express-session");
const MongoStore = require("connect-mongo");
const connection = require('./db');
require("dotenv").config();

// const { createClient } = require("redis");
// const { default: RedisStore } = require("connect-redis");
// const { logger } = require("../utils/logger");
// const redisClient = createClient();
// redisClient
//   .connect()
//   .then(() => logger.log("info", "[Redis] client is up and running.."))
//   .catch(() => { logger.log("error", "[Redis] failed connect\n")});

// const redisStore = new RedisStore({
//   client: redisClient,
//   prefix: 'snazCRM:',
// });

const mongoStore = new MongoStore({
  mongoUrl: process.env.MONGODB_URI,
  mongooseConnection: connection,
  collectionName: 'sessions',
});

module.exports = session({
  name: "snaz_0ozQd8310",
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  unset: "destroy",
  store: mongoStore,
  cookie: {
    httpOnly: true,
    // maxAge: 1000 * 60 * 10,
  },
});

// TODO: implement session info.
