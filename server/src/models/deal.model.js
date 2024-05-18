const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema(
  {
    // Deal Information
    title: {
      type: String,
      unique: true,
      sparse: true,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 255,
    },
    amount: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    closingDate: Date,
    expectedRevenue: {
      type: mongoose.Schema.Types.Decimal128,
    },

    // Deal Associations
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contact',
    },

    // Deal Stages and Tracking
    stage: {
      type: String,
      required: true,
      enum: ['Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'],
    },
    type: {
      type: String,
      trim: true,
    },
    reasonForLoss: {
      type: String,
      enum: ['Competitor', 'Budget Constraints', 'No Decision', 'Other'],
    },
    nextStep: {
      type: String,
      trim: true,
    },
    probability: {
      type: Number,
      min: 0,
      max: 100,
    },
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
      ],
    },

    //   // Deal Timeline and Metrics
    //   SalesCycleDuration: Number, // Optional (in days)
    //   LeadConversionTime: Number, // Optional (in days)
    //   OverallSalesDuration: Number, // Optional (in days)
    //   LastActivityTime: Date,
    tag: {
      type: String,
      trim: true,
    },

    // System Information
    id: {
      type: String,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recordId: Number, // Optional (unique ID from original data source)
    changeLogTime: Date, // Optional (timestamp of last change)
    locked: Boolean,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Deal', DealSchema);
