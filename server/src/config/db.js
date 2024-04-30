const mongoose = require('mongoose');
const { logger } = require('../utils/logger');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
// Database Connection process.env.MONGODB_URI
const connection = mongoose.createConnection(uri);

// Since We're defining models using mongoose.model
const run = async () => {
  await mongoose
    .connect(uri)
    .then(() => logger.log('info', 'Connected to Mongo!'))
    .catch((err) => logger.log('error', 'Error connecting to Mongo :/\n', err));
  // Logging operations mongoose sends to MongoDB to the console.
  // mongoose.set('debug', (collectionName, methodName, ...methodArgs) => {
  //   logger.log(
  //     'info',
  //     `\x1b[1mMongoose\x1b[0m: ${collectionName}.${methodName}(${JSON.stringify(methodArgs)})`,
  //   );
  // });
};

module.exports = {
  connection,
  run,
};
