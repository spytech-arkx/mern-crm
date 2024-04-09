const User = require('../../models/user.model');

async function readUsers(filter, projection, options) {
  try {
    return await User.find(filter, projection, options); // Return the response
  } catch (err) {
    throw err;
  }
}

async function getUserByEmail(email) {
  try {
    const filter = { email: email }; // Filter by the specified email
    const projection = { email: 1, password: 1 }; // Include email and password fields
    const user = await User.find(filter, projection); // Return the response
    // const user = await readUsers({email}, { email: 1, password: 1 })
    // Check if any user was found
    if (user) {
      return user[0];
    }
    return null;
  } catch (err) {
    throw err;
  }
}

async function writeUsers(docs, operation, filters) {
  try {
    const arr = Array.isArray(docs) ? docs : [docs];

    const bulkOps = arr.reduce((obj, current) => {
      // eslint-disable-next-line no-param-reassign
      obj[operation] = {
        filter: filters,
        update: operation === 'updateOne' ? current : undefined, // Add update only for updates
        document: operation === 'insertOne' ? current : undefined, // Add document only for inserts
      };
      return obj;
    }, {});

    return await User.bulkWrite([bulkOps], { ordered: true });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  readUsers,
  writeUsers,
  getUserByEmail,
};
