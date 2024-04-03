const mongoose = require('mongoose');

// Define the Deal schema
const dealSchema = mongoose.Schema({
  deal_name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  stage: {
    type: String,
    enum: ['Qualification', 'Negotiation', 'Closure', 'Other'],
    default: 'Qualification',
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  contacts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Contact',
    required: true,
  },

  close_date: [
    {
      type: String,
    },
  ],
});

// Create and export the Deal model

module.exports = mongoose.model('Deal', dealSchema);
