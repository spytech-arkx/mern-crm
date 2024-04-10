const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema(
  {
    // Deal Information
    DealName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    Description: {
      type: String,
      trim: true,
      maxlength: 255,
    },
    Amount: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    ClosingDate: Date,
    ExpectedRevenue: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },

    // Deal Associations
    CompanyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    ContactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contact',
    },

    // Deal Stages and Tracking
    Stage: {
      type: String,
      required: true,
      enum: ['Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'],
    },
    Type: {
      type: String,
      required: true,
      enum: ['New Business', 'Renewal', 'Upsell'],
    },
    ReasonForLoss: {
      type: String,
      enum: ['Competitor', 'Budget Constraints', 'No Decision', 'Other'],
    },
    NextStep: {
      type: String,
      trim: true,
    },
    Probability: {
      type: Number,
      min: 0,
      max: 100,
    },
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

    //   // Deal Timeline and Metrics
    //   SalesCycleDuration: Number, // Optional (in days)
    //   LeadConversionTime: Number, // Optional (in days)
    //   OverallSalesDuration: Number, // Optional (in days)
    //   LastActivityTime: Date,
    Tag: {
      type: String,
      trim: true,
    },

    // System Information
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    RecordId: Number, // Optional (unique ID from original data source)
    ChangeLogTime: Date, // Optional (timestamp of last change)
    Locked: Boolean,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Deal', DealSchema);
