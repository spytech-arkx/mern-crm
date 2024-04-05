const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    // Main Information
    firstName: {
      type: String,
      required: [true, 'First name is required.'],
      trim: true,
      match: [/^[a-zA-Z\s]+$/, 'Please provide a valide name.'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required.'],
      trim: true,
      match: [/^[a-zA-Z\s]+$/, 'Please provide a valide name.'],
    },

    // Contact Information
    email: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      match: [
        /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm,
        'Please provide a valid email address.',
      ],
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      match: [
        /* Detects most of the phone numbers all over the world */
        /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g,
        'Please provide a valid phone number.',
      ],
    },
    birthday: {
      type: Date,
      required: false,
    },
    notes: {
      type: String,
      maxlength: 80,
      trim: true,
    },

    // Social Media Links
    socials: {
      X: {
        type: String,
        trim: true,
        unique: true,
        sparse: true,
        match: /twitter/g,
      },
      LinkedIn: {
        type: String,
        trim: true,
        unique: true,
        sparse: true,
        unique: false,
        match: /linkedin/g, // l3gz
      },
    },

    // Address Information (Optional)
    Address: {
      Street: { type: String, trim: true },
      City: { type: String, trim: true },
      State: { type: String, trim: true },
      Country: { type: String, trim: true },
    },

    // Association Information
    Company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    SkypeID: {
      type: String,
      trim: true,
      match: [/^live:([a-zA-Z0-9][a-zA-Z0-9-]{5,31})$/, 'Not a Skype ID.'],
    },

    // System Information
    type: {
      // Must be provided at POST, this is the most convenient way.
      type: String,
      trim: true,
      enum: ['contact', 'ct', 'Contact'],
      default: 'contact',
    },
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Locked: Boolean, // Flag indicating if record is locked for editing
  },
  {
    timestamps: true,
  },
  {
    virtuals: {
      fullName: {
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
      },
    },
  },
);

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;
