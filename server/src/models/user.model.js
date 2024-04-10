//Import required modules
const mongoose = require('mongoose');
const validator = require('validator'); // Import Validator for data validatio

const userSchema = new mongoose.Schema({
  /*firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  */
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isAlphanumeric(value),
      message: 'Username is not valid',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Email is not valid',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  verified: {
    type: Boolean,
    default: false,
  },

  phoneNumber: {
    type: String,
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'salesperson', 'support'],
    default: 'salesperson',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
