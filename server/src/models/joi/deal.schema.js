/* eslint-disable newline-per-chained-call */
const Joi = require('joi');
const mongoose = require('mongoose');

const dealSchema = Joi.object({
  // Deal Information
  DealName: Joi.string().required().trim().min(3).max(50),
  Description: Joi.string().trim().max(255),
  Amount: Joi.number().required(), // Assuming Amount should be a number
  ExpectedRevenue: Joi.number().required(), // Assuming ExpectedRevenue should be a number
  ClosingDate: Joi.date(),

  // Deal Associations
  CompanyId: Joi.string()
    .custom((value, helper) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helper.error('Invalid Company reference.');
      }
      return value;
    })
    .required(),
  ContactId: Joi.string()
    .custom((value, helper) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helper.error('Invalid Contact reference.');
      }
      return value;
    })
    .required(),

  // Deal Stages and Tracking
  Stage: Joi.string()
    .required()
    .valid('Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'),
  Type: Joi.string().required().valid('New Business', 'Renewal', 'Upsell'),
  ReasonForLoss: Joi.string()
    .optional()
    .valid('Competitor', 'Budget Constraints', 'No Decision', 'Other'),
  NextStep: Joi.string().trim().optional(),
  Probability: Joi.number().min(0).max(100).optional(),
  LeadSource: Joi.string()
    .optional()
    .valid('Website', 'Referral', 'Marketing Campaign', 'Other'),

  // Omit Timeline and Metrics fields (likely read-only)

  // System Information (mostly read-only, so validation omitted here)
  // CreatedBy: Joi.string().custom(...).optional(), // Omit for security
  // ModifiedBy: Joi.string().custom(...).optional(), // Omit for security
  // CreatedTime: Joi.date().optional(), // Omit, read-only
  // ModifiedTime: Joi.date().optional(), // Omit, read-only

  Tag: Joi.string().trim().optional(),
  RecordId: Joi.number().optional(),
  ChangeLogTime: Joi.date().optional(),
  Locked: Joi.boolean().optional(),
});

const dealUpdateSchema = Joi.object({
  // Deal Information
  DealName: Joi.string().trim().min(3).max(50).optional(),
  Description: Joi.string().trim().max(255).optional(),
  Amount: Joi.number().optional(),
  ExpectedRevenue: Joi.number().optional(),
  ClosingDate: Joi.date().optional(),

  // Deal Associations
  CompanyId: Joi.string()
    .custom((value, helper) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helper.error('Invalid Company reference.');
      }
      return value;
    })
    .optional(),
  ContactId: Joi.string()
    .custom((value, helper) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helper.error('Invalid Contact reference.');
      }
      return value;
    })
    .optional(),

  // Deal Stages and Tracking
  Stage: Joi.string()
    .valid('Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost')
    .optional(),
  Type: Joi.string().valid('New Business', 'Renewal', 'Upsell').optional(),
  ReasonForLoss: Joi.string()
    .valid('Competitor', 'Budget Constraints', 'No Decision', 'Other')
    .optional(),
  NextStep: Joi.string().trim().optional(),
  Probability: Joi.number().min(0).max(100).optional(),
  LeadSource: Joi.string()
    .valid('Website', 'Referral', 'Marketing Campaign', 'Other')
    .optional(),

  // Omit Deal Timeline and Metrics (likely read-only)
  // SalesCycleDuration: Joi.number().optional(),
  // LeadConversionTime: Joi.number().optional(),
  // OverallSalesDuration: Joi.number().optional(),
  // LastActivityTime: Joi.date().optional(),

  // System Information (mostly read-only, so validation omitted here)
  // CreatedBy: Joi.string().custom(...).optional(), // Omit for security
  // ModifiedBy: Joi.string().custom(...).optional(), // Omit for security
  // CreatedTime: Joi.date().optional(), // Omit, read-only
  // ModifiedTime: Joi.date().optional(), // Omit, read-only

  Tag: Joi.string().trim().optional(),
  RecordId: Joi.number().optional(), // Optional (unique ID from original data source)
  ChangeLogTime: Joi.date().optional(), // Optional (timestamp of last change)
  Locked: Joi.boolean().optional(),
});

module.exports = {
  dealSchema,
  dealUpdateSchema,
};
