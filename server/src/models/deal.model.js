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
    },
    notes: {
      type: String,
      trim: true,
    },
    amount: Number,
    closingDate: Date,
    expectedRevenue: Number,

    // Deal Associations
    // assignee: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    // },
    // company: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Company',
    // },
    // contact: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Contact',
    // },

    assignee: {
      type: Object,
    },
    company: {
      type: Object,
    },
    contact: {
      type: Object,
    },

    // Deal Stages and Tracking
    stage: {
      type: String,
      default: "New Lead",
    },
    type: {
      type: String,
      trim: true,
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
    },
    attachements: [{
      name: {
        type: String,
        trim: true,
      },
      size: {
        type: Number,
      },
      type: {
        type: String,
        trim: true,
      },
      url: {
        type: String,
        trim: true,
      },
    }],

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
