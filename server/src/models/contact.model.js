const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    // Main Information
    Salutation: {
      type: String,
      enum: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', ''],
    },
    FirstName: {
      type: String,
      required: [true, 'First name is required.'],
      trim: true,
      match: [/^[a-zA-Z\s]+$/, 'Please provide a valide name.'],
    },
    LastName: {
      type: String,
      required: [true, 'Last name is required.'],
      trim: true,
      match: [/^[a-zA-Z\s]+$/, 'Please provide a valide name.'],
    },
    // Contact Information
    Email: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      match: [
        /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm,
        'Please provide a valid email address.',
      ],
    },
    Phone: {
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
    Birthday: {
      type: Date,
      required: false,
    },
    Address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      zipCode: { type: String, trim: true },
    },
    Description: {
      type: String,
      maxlength: 80,
      trim: true,
    },
    EmailOptOut: Boolean,

    // Social Media Links
    Socials: {
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
    LeadSource: {
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
    CompanyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    Title: {
      type: String,
      trim: true,
      MaxLength: 60,
    },
    SkypeId: {
      type: String,
      trim: true,
      match: [/^live:([a-zA-Z0-9][a-zA-Z0-9-]{5,31})$/, 'Not a Skype ID.'],
    },

    // System Information
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    LastModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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

module.exports = mongoose.model('Contact', ContactSchema);
