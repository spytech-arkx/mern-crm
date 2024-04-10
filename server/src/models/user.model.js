const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    // Main Information
    FirstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1, // Enforce a minimum length
      maxlength: 50, // Enforce a maximum length
    },
    LastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },

    // Contact Information
    Email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true, // Convert email to lowercase for consistency
      validate: {
        validator: (email) => /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm.test(email),
        message: 'Invalid email format',
      },
    },
    Phone: {
      type: String,
      trim: true,
      match: [
        /* Detects most of the phone numbers all over the world */
        /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g,
        'Please provide a valid phone number.',
      ],
    },

    // Address Information
    Address: {
      type: mongoose.Schema.Types.Mixed, // redundant but good to know.
      properties: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        country: { type: String, trim: true },
        zipCode: { type: String, trim: true },
      },
    },

    // Login Information
    Username: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      match: [/[a-z_.0-9]/, 'Invalid username format'],
    },
    Password: {
      type: String,
      required: true,
      // TODO: add more complex password validation using bcrypt
    },

    // User Details
    DateOfBirth: { type: Date },
    Website: { type: String, trim: true },
    Avatar: { type: String, trim: true }, // Store the path to the avatar image,

    // Preferences
    Language: { type: String, trim: true },
    CountryLocale: { type: String, trim: true },
    TimeZone: { type: String, trim: true },
    DateFormat: { type: String, trim: true },
    TimeFormat: { type: String, trim: true },

    // Roles and Permissions
    Role: { type: String, enum: ['admin', 'user', 'editor'] }, // Define allowed roles },

    // Account Management
    AddedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    IsActive: { type: Boolean, default: true },

    // Additional Information and preferences Inshaa'Allah
    Alias: { type: String, trim: true },
    Grouping: { type: String, trim: true },
    SortOrder: { type: String, trim: true },
    Confirm: { type: Boolean },
    Notes: { type: String, trim: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', UserSchema);
