const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    // Main Information
    companyName: {
      type: String,
      required: [true, 'Company Name is required.'],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    Website: {
      type: String,
      trim: true,
      validate: {
        validator: (url) => /^(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,6})([/\w .-]*)*\/?$/.test(url),
        message: (props) => `${props.value} is not a valid website URL.`,
      },
    },
    Industry: {
      type: String,
      required: true,
      enum: ['Technology', 'Healthcare', 'Finance', 'Retail', 'Other'],
    },
    Size: {
      type: String,
      required: true,
      enum: ['Small', 'Medium', 'Enterprise'],
    },

    // Address Information
    BillingAddress: {
      Street: {
        type: String,
        trim: true,
        required: [
          this.ShippingAddress === undefined,
          'At least one address (Billing or Shipping) is required.',
        ],
      },
      City: { type: String, trim: true },
      State: { type: String, trim: true },
      PostalCode: {
        type: String,
        trim: true,
        validate: {
          validator: (postalCode) => /^\d{5}(-\d{4})?$/.test(postalCode),
          message: 'Please enter a valid postal code.',
        },
      },
    },
    ShippingAddress: {
      Street: { type: String, trim: true },
      City: { type: String, trim: true },
      PostalCode: {
        type: String,
        trim: true,
        validate: {
          validator: (postalCode) => /^\d{5}(-\d{4})?$/.test(postalCode),
          message: 'Please enter a valid postal code.',
        },
      },
    },

    // Company Relationships
    companyOwner: { type: mongoose.Types.ObjectId, ref: 'User' }, // User lookup
    parentCompany: { type: mongoose.Types.ObjectId, ref: 'Company' }, // Optional lookup for parent company

    // Descriptive Information
    Description: { type: String, trim: true, maxlength: 255 },
    Rating: {
      type: String,
      enum: ['Hot', 'Warm', 'Cold'],
    },
    companySite: { type: String, trim: true },
    BillingCode: { type: String, trim: true },
    ShippingCode: { type: String, trim: true },
    TickerSymbol: { type: String, trim: true, uppercase: true }, // (AAPL, TSLA ...)

    // Company Details
    companyType: {
      type: String,
      required: true,
      enum: ['Customer', 'Partner', 'Vendor'],
    },
    Ownership: {
      type: String,
      enum: ['Public', 'Private', 'Government'],
    },
    Employees: { type: Number, min: 1 }, // Set a minimum for employee count
    AnnualRevenue: { type: mongoose.Types.Decimal128 },

    // Optional Information
    Tag: { type: String, trim: true },

    // System Information
    type: {
      type: String,
      trim: true,
      default: 'company',
    },
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    CreatedTime: Date,
    ModifiedTime: Date,
    LastActivityTime: Date,
    RecordId: Number, // Optional (unique ID from original data source)

    // Virtuals
    // None for the moment
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Company', companySchema);
