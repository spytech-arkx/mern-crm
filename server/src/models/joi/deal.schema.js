/* eslint-disable newline-per-chained-call */
const Joi = require('joi');
const mongoose = require('mongoose');

const dealSchema = Joi.object({
  // Deal Information
  title: Joi.string().required().trim().min(3).max(50),
  notes: Joi.string().trim(),
  amount: Joi.number().required(), // Assuming Amount should be a number
  expectedRevenue: Joi.number(), // Assuming ExpectedRevenue should be a number
  closingDate: Joi.date(),
  attachements: Joi.array().items(
    Joi.object({
      name: Joi.string().trim(),
      type: Joi.string().trim(),
      size: Joi.number(),
      url: Joi.string().uri(),
    }),
  ),

  // Deal Associations
  assignee: Joi.object(),
  company: Joi.string()
    .custom((value, helper) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helper.error('Invalid Company reference.');
      }
      return value;
    }),
  contact: Joi.string()
    .custom((value, helper) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helper.error('Invalid Contact reference.');
      }
      return value;
    }),
  // Deal Stages and Tracking
  stage: Joi.string(),
  type: Joi.string(),
  nextStep: Joi.string().trim().optional(),
  probability: Joi.number().min(0).max(100).optional(),
  leadSource: Joi.string()
    .optional(),
  tag: Joi.string().trim().optional(),
  recordId: Joi.number().optional(),
  changeLogTime: Joi.date().optional(),
  locked: Joi.boolean().optional(),
});

const dealUpdateSchema = dealSchema.fork(
  ['title', 'company', 'contact', 'stage', 'amount'],
  (schema) => schema.optional(),
);

module.exports = {
  dealSchema,
  dealUpdateSchema,
};
