const Joi = require('joi');

const companySchema = Joi.object({
  // Main Information
  companyName: Joi.string().trim().min(3).max(50).required(),

  // Address Information
  billingAddress: Joi.object({
    street: Joi.string().trim(),
    city: Joi.string().trim(),
    state: Joi.string().trim(),
    billingCode: Joi.string().trim(),
    postalCode: Joi.string()
      .trim()
      .pattern(/^\d{5}(-\d{4})?$/)
      .message('Please enter a valid postal code.'),
  }),

  shippingAddress: Joi.object({
    street: Joi.string().trim(),
    city: Joi.string().trim(),
    shippingCode: Joi.string().trim(),
    postalCode: Joi.string()
      .trim()
      .pattern(/^\d{5}(-\d{4})?$/)
      .message('Please enter a valid postal code.'),
  }),

  // Company Relationships
  owner: Joi.string()
    .trim()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .message('Invalid Mongo Id'),
  parentCompany: Joi.string()
    .trim()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .message('Invalid Mongo Id'),

  // Descriptive Information
  description: Joi.string().trim().max(255),
  rating: Joi.string()
    .trim()
    .valid('Aqcuired', 'Active', 'Market Failed', 'Project Cancelled', 'Shut Down'),
  website: Joi.string().trim().uri().message('Not a valid website URL.'),
  tickerSymbol: Joi.string().trim().uppercase(),

  // Company Details
  companyType: Joi.string().trim().max(16),
  ownership: Joi.string().trim().max(16),
  industry: Joi.string().trim().max(30).required(),
  employees: Joi.number().integer().min(1),
  annualRevenue: Joi.number().precision(2),

  // Optional Information
  tag: Joi.string().trim(),
  // System Information
  lastActivityTime: Joi.date(),
}).options({ abortEarly: false, stripUnknown: true });

const companyUpdateSchema = companySchema.fork(
  ['companyName', 'industry'],
  (schema) => schema.optional(),
);

module.exports = {
  companySchema,
  companyUpdateSchema,
};
