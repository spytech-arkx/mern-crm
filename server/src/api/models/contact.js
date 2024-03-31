const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    // Main Information
    firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
    },
    middleName: { type: String, default: "", trim: true },

    // Contact Information
    email: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      match: [
        /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm,
        "Please provide a valid email address.",
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
        "Please provide a valid phone number.",
      ],
    },
    birthday: Date,
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
    Company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    SkypeID: {
      type: String,
      trim: true,
      match: [/^live:([a-zA-Z0-9][a-zA-Z0-9\-]{5,31})$/, "Not a Skype ID."],
    },

    // System Information
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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

exports.Contact = mongoose.model('Contact', ContactSchema);
