const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Main Information
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1, // Enforce a minimum length
    maxlength: 50, // Enforce a maximum length
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50,
  },

  // Contact Information
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true, // Convert email to lowercase for consistency
    validate: {
      validator: (email) =>
        /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm.test(email),
      message: 'Invalid email format',
    },
  },
  phone: {
    type: String,
    trim: true,
    match: [
      /* Detects most of the phone numbers all over the world */
      /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g,
      'Please provide a valid phone number.',
    ],
  },
  mobile: {
    type: String,
    trim: true,
    match: [
      /* Detects most of the phone numbers all over the world */
      /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g,
      'Please provide a valid phone number.',
    ],
  },

  // Address Information
  address: {
    type: mongoose.Schema.Types.Mixed, // Allow for flexible address structure
    properties: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      zipCode: { type: String, trim: true },
    },
  },

  // Login Information
  password: {
    type: String,
    required: true,
    // TODO: add more complex password validation using bcrypt
  },

  // User Details
  username: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    match: [/[a-z_.0-9]/, 'Invalid username format'],
  },
  dateOfBirth: { type: Date },
  website: { type: String, trim: true },
  avatar: { type: String, trim: true }, // Store the path to the avatar image },

  // Preferences
  language: { type: String, trim: true },
  countryLocale: { type: String, trim: true },
  timeZone: { type: String, trim: true },
  dateFormat: { type: String, trim: true },
  timeFormat: { type: String, trim: true },

  // Roles and Permissions
  role: { type: String, enum: ['admin', 'user', 'editor'] }, // Define allowed roles },

  // Account Management
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  addedTime: { type: Date, default: Date.now },
  modifiedTime: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },

  // Additional Information and preferences Inshaa'Allah
  alias: { type: String, trim: true },
  grouping: { type: String, trim: true },
  sortOrder: { type: String, trim: true },
  confirm: { type: Boolean },
  notes: { type: String, trim: true },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
