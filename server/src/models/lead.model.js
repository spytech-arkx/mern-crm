const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema(
  {
    // *** Identification and Basic Information ***
    firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
      match: [/^[a-zA-Z\s]+$/, "Please provide a valide name."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
      match: [/^[a-zA-Z\s]+$/, "Please provide a valide name."],
    },
    title: {
      type: String,
      maxLength: 26,
      trim: true,
    }, // Job title of the lead contact
    owner: { type: mongoose.Types.ObjectId, ref: "User" }, // User lookup
    description: {
      type: String,
      trim: true,
      maxLength: 255,
    }, // General description of the lead
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },

    // *** Address Information ***
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String, // Optional
    },

    // *** Contact Information ***
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
    website: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      validate: {
        validator: (url) =>
          /^(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,6})([/\w .-]*)*\/?$/.test(url),
        message: (props) => `${props.value} is not a valid website URL.`,
      },
    },
    // *** Lead Qualification and Source ***
    leadSource: {
      type: String,
      enum: [
        "None",
        "Advertisement",
        "Employee Referral",
        "Facebook",
        "Twitter",
        "Google+",
        "External Referral",
        "Public Relations",
        "Web Download",
        "Web Research",
        "Cold Call",
        "Chat",
        "",
      ],
    },
    leadStatus: {
      type: String,
      enum: ["Not Contacted", "Not Qualified", "Qualified", "Contacted", "Lost Lead"],
    }, // Sales funnel stages
    industry: {
      type: String,
      trim: true,
      maxlength: 30,
      // enum: ['Technology', 'Finance', 'Education','Real Estate'...], // synci l'front!
    },
    numberOfEmployees: {
      type: Number,
      min: 1,
    }, // Optional (company size)
    annualRevenue: { type: mongoose.Types.Decimal128 }, // Optional (company revenue)

    tag: String, // Keyword or label for categorization
    rating: {
      type: String,
      trim: true,
      enum: ["Aqcuired", "Active", "Market Failed", "Project Cancelled", "Shut Down"],
    },

    // *** Communication Preferences ***
    emailOptOut: {
      type: Boolean, // Flag indicating email opt-out
    },
    skypeId: {
      type: String,
      trim: true,
      match: [/^live:([a-zA-Z0-9][a-zA-Z0-9-]{5,31})$/, "Not a Skype ID."],
    },

    // *** System Information ***
    id: {
      type: String,
    },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" }, // User who created the lead
    modifiedBy: { type: mongoose.Types.ObjectId, ref: "User" }, // User who last modified the lead

    salutation: {
      type: String,
      enum: ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."],
    },

    // *** Conversion Information (Optional) ***
    converted: {
      convertedDate: Date,
      convertedBy: { type: mongoose.Types.ObjectId, ref: "User" },
      convertedContact: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
      convertedDeal: { type: mongoose.Schema.Types.ObjectId, ref: "Deal" },
    },

    // *** Additional Attributes ***
    isConverted: Boolean, // Flag indicating conversion to customer
    birthday: Date, // Optional

    // *** Security and Permissions ***
    locked: Boolean, // Flag indicating if record is locked for editing
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    virtuals: {
      fullName: {
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
      },
    },
  },
);

module.exports = mongoose.model("Lead", LeadSchema);
