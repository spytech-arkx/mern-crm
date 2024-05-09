const bcrypt = require('bcrypt');

async function hashPassword(next) {
  try {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
}

async function hashExistingPassword(next) {
  try {
    // Access the updated password from the update object (if provided)
    const update = this._update; // Mongoose v5+ syntax
    if (update && update.$set && update.$set.password) {
      const newPassword = update.$set.password;
      const hash = await bcrypt.hash(newPassword, 10);
      update.$set.password = hash; // Update the password in the update object
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  hashPassword,
  hashExistingPassword,
};
