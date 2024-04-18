const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    // Main Information
    salutation: {
      type: String,
      enum: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', ''],
    },
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
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      zipCode: { type: String, trim: true },
    },
    description: {
      type: String,
      maxlength: 80,
      trim: true,
    },
    emailOptOut: Boolean,

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
        match: /linkedin/g, // l3gz
      }, // Add more.. la bghiti
    },

    // Sales pipeline specific infos
    leadSource: {
      type: String,
      enum: [
        'None',
        'Advertisement',
        'Employee Referral',
        'Facebook',
        'Twitter',
        'Google+',
        'External Referral',
        'Public Relations',
        'Web Download',
        'Web Research',
        'Cold Call',
        'Chat',
        '',
      ],
    },

    // Association Information
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    title: {
      type: String,
      trim: true,
      MaxLength: 60,
    },
    skypeId: {
      type: String,
      trim: true,
      match: [/^live:([a-zA-Z0-9][a-zA-Z0-9-]{5,31})$/, 'Not a Skype ID.'],
    },

    // System Information
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    locked: Boolean, // Flag indicating if record is locked for editing
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

module.exports = mongoose.model('Contact', ContactSchema);
