/* eslint-disable newline-per-chained-call */
const Joi = require('joi');
const mongoose = require('mongoose');

const dealSchema = Joi.object({
  // Deal Information
  dealName: Joi.string().required().trim().min(3).max(50),
  description: Joi.string().trim().max(255),
  amount: Joi.number().required(), // Assuming Amount should be a number
  expectedRevenue: Joi.number(), // Assuming ExpectedRevenue should be a number
  closingDate: Joi.date(),

  // Deal Associations
  companyId: Joi.string()
    .custom((value, helper) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helper.error('Invalid Company reference.');
      }
      return value;
    })
    .required(),
  contactId: Joi.string()
    .custom((value, helper) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helper.error('Invalid Contact reference.');
      }
      return value;
    })
    .required(),

  // Deal Stages and Tracking
  stage: Joi.string()
    .required()
    .valid('Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'),
  type: Joi.string().valid('New Business', 'Renewal', 'Upsell'),
  reasonForLoss: Joi.string(),
  nextStep: Joi.string().trim().optional(),
  probability: Joi.number().min(0).max(100).optional(),
  leadSource: Joi.string()
    .optional()
    .valid('Website', 'Referral', 'Marketing Campaign', 'Other'),

  tag: Joi.string().trim().optional(),
  recordId: Joi.number().optional(),
  changeLogTime: Joi.date().optional(),
  locked: Joi.boolean().optional(),
});

const dealUpdateSchema = dealSchema.fork(
  ['dealName', 'companyId', 'contactId', 'stage', 'amount'],
  (schema) => schema.optional(),
);

module.exports = {
  dealSchema,
  dealUpdateSchema,
};
