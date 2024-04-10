const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  // *** Identification and Basic Information ***
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
  Title: {
    type: String,
    maxLength: 26,
    trim: true,
  }, // Job title of the lead contact
  Owner: { type: mongoose.Types.ObjectId, ref: 'User' }, // User lookup
  Description: {
    type: String,
    trim: true,
    maxLength: 255,
  }, // General description of the lead
  Company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },

  // *** Address Information ***
  Address: {
    Street: String,
    City: String,
    State: String,
    Country: String,
    PostalCode: String, // Optional
  },

  // *** Contact Information ***
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
  Website: {
    type: String,
    unique: true,
    trim: true,
    validate: {
      validator: (url) => /^(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,6})([/\w .-]*)*\/?$/.test(url),
      message: (props) => `${props.value} is not a valid website URL.`,
    },
  },
  // *** Lead Qualification and Source ***
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
  LeadStatus: {
    type: String,
    enum: ['Not Contacted', 'Not Qualified', 'Qualified', 'Contacted', 'Lost Lead'],
  }, // Sales funnel stages
  Industry: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
    // enum: ['Technology', 'Finance', 'Education','Real Estate'...], // synci l'front!
  },
  NumberOfEmployees: {
    type: Number,
    min: 1,
  }, // Optional (company size)
  AnnualRevenue: { type: mongoose.Types.Decimal128 }, // Optional (company revenue)

  Tag: String, // Keyword or label for categorization
  Rating: {
    type: String,
    trim: true,
    enum: ['Aqcuired', 'Active', 'Market Failed', 'Project Cancelled', 'Shut Down'],
  },

  // *** Communication Preferences ***
  EmailOptOut: {
    type: Boolean, // Flag indicating email opt-out
  },
  SkypeId: {
    type: String,
    trim: true,
    match: [/^live:([a-zA-Z0-9][a-zA-Z0-9-]{5,31})$/, 'Not a Skype ID.'],
  },

  // *** System Information ***
  CreatedBy: { type: mongoose.Types.ObjectId, ref: 'User' }, // User who created the lead
  ModifiedBy: { type: mongoose.Types.ObjectId, ref: 'User' }, // User who last modified the lead

  Salutation: {
    type: String,
    enum: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.'],
  },

  // *** Conversion Information (Optional) ***
  Converted: {
    ConvertedDate: Date,
    ConvertedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
    ConvertedContact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
    ConvertedDeal: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal' },
  },

  // *** Additional Attributes ***
  IsConverted: Boolean, // Flag indicating conversion to customer
  Birthday: Date, // Optional

  // *** Security and Permissions ***
  Locked: Boolean, // Flag indicating if record is locked for editing
});

LeadSchema.add({ timestamps: true });
LeadSchema.add({
  virtuals: {
    fullName: {
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
  },
});

module.exports = mongoose.model('Lead', LeadSchema);
