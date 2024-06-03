const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    // Main Information
    name: {
      type: String,
      unique: true,
      sparse: true,
      required: [true, "Company Name is required."],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    // Address Information
    billingAddress: {
      Street: {
        type: String,
        trim: true,
      },
      City: { type: String, trim: true },
      State: { type: String, trim: true },
      BillingCode: { type: String, trim: true }, // Khtissar
      PostalCode: {
        type: String,
        trim: true,
      },
    },

    shippingAddress: {
      Street: { type: String, trim: true },
      City: { type: String, trim: true },
      ShippingCode: { type: String, trim: true },
      PostalCode: {
        type: String,
        trim: true,
        validate: {
          validator: (postalCode) => /^\d{5}(-\d{4})?$/.test(postalCode),
          message: "Please enter a valid postal code.",
        },
      },
    },

    logo: { type: String, trim: true }, // URL of the company's logo

    // Company Relationships
    owner: { type: mongoose.Types.ObjectId, ref: "User" }, // User lookup
    parentCompany: { type: mongoose.Types.ObjectId, ref: "Company" }, // Optional lookup for parent company

    // Descriptive Information
    description: { type: String, trim: true, maxlength: 255 },
    rating: {
      type: String,
      trim: true,
      enum: ["Acquired", "Active", "Market Failed", "Project Cancelled", "Shut Down"],
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
    tickerSymbol: { type: String, trim: true, uppercase: true }, // (AAPL, TSLA ...)

    // Company Details
    companyType: {
      type: String,
      // required: true,
      trim: true,
      maxlength: 16,
      // enum: ['Customer', 'Partner', 'Vendor'],
    },
    ownership: {
      type: String,
      // required: true,
      trim: true,
      maxlength: 16,
      // enum: ['Public', 'Private', 'Government'], // sync with lfront
    },
    industry: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
      // enum: ['Technology', 'Finance', 'Education','Real Estate'...], // synci l'front!
    },
    employees: { type: Number, min: 1 }, // Set a minimum for employee count
    annualRevenue: { type: Number, min: 1000 },

    // Optional Information
    tag: { type: String, trim: true },

    // System Information
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    lastActivityTime: Date,
    id: {
      type: String,
    },
    // Virtuals
    // None for the moment
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Company", CompanySchema);
