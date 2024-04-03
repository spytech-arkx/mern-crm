const Joi = require('joi');
const mongoose = require('mongoose');

const companySchema = Joi.object({
  // eslint-disable-next-line newline-per-chained-call
  companyName: Joi.string().required().trim().min(3).max(50),

  Website: Joi.string().trim().uri({ allowRelative: false }),

  Industry: Joi.string()
    .required()
    .valid('Technology', 'Healthcare', 'Finance', 'Retail', 'Other'),
  Size: Joi.string().required().valid('Small', 'Medium', 'Enterprise'),

  BillingAddress: Joi.object({
    Street: Joi.string().trim(),
    City: Joi.string().trim(),
    State: Joi.string().trim(),
    PostalCode: Joi.string()
      .trim()
      .regex(/^\d{5}(-\d{4})?$/),
  }),
  ShippingAddress: Joi.object({
    Street: Joi.string().trim().optional(),
    City: Joi.string().trim(),
    PostalCode: Joi.string()
      .trim()
      .regex(/^\d{5}(-\d{4})?$/),
  }),

  companyOwner: Joi.string().custom((value, helper) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helper.error('Invalid User reference.');
    }
    return value;
  }),
  parentCompany: Joi.string().custom((value, helper) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helper.error('Invalid Company reference.');
    }
    return value;
  }),

  Description: Joi.string().trim().max(255),
  Rating: Joi.string().valid('Hot', 'Warm', 'Cold'),
  companySite: Joi.string().trim(),
  BillingCode: Joi.string().trim(),
  ShippingCode: Joi.string().trim(),
  TickerSymbol: Joi.string().trim().uppercase(),

  companyType: Joi.string().required().valid('Customer', 'Partner', 'Vendor'),
  Ownership: Joi.string().valid('Public', 'Private', 'Government'),
  Employees: Joi.number().integer().min(1),
  AnnualRevenue: Joi.number().optional(),

  Tag: Joi.string().trim(),

  // System Information (mostly read-only, so validation omitted here)
  type: Joi.valid('company', 'Company', 'cp').default('company'),
  CreatedBy: Joi.string(),
  ModifiedBy: Joi.string(),
  CreatedTime: Joi.date(),
  ModifiedTime: Joi.date(),
  LastActivityTime: Joi.date(),
});

const companyUpdateSchema = Joi.object({
  // eslint-disable-next-line newline-per-chained-call
  companyName: Joi.string().trim().min(3).max(50).optional(),

  Website: Joi.string().trim().uri({ allowRelative: false }).optional(),

  Industry: Joi.string()
    .valid('Technology', 'Healthcare', 'Finance', 'Retail', 'Other')
    .optional(),

  Size: Joi.string().valid('Small', 'Medium', 'Enterprise').optional(),

  BillingAddress: Joi.object({
    Street: Joi.string().trim().optional(),
    City: Joi.string().trim().optional(),
    State: Joi.string().trim().optional(),
    PostalCode: Joi.string()
      .trim()
      .regex(/^\d{5}(-\d{4})?$/)
      .optional(),
  }).optional(),

  ShippingAddress: Joi.object({
    Street: Joi.string().trim().optional(),
    City: Joi.string().trim().optional(),
    PostalCode: Joi.string()
      .trim()
      .regex(/^\d{5}(-\d{4})?$/)
      .optional(),
  }).optional(),

  companyOwner: Joi.string()
    .custom((value, helper) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helper.error('Invalid User reference.');
      }
      return value;
    })
    .optional(),

  parentCompany: Joi.string()
    .custom((value, helper) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helper.error('Invalid Company reference.');
      }
      return value;
    })
    .optional(),

  Description: Joi.string().trim().max(255).optional(),
  Rating: Joi.string().valid('Hot', 'Warm', 'Cold').optional(),
  companySite: Joi.string().trim().optional(),
  BillingCode: Joi.string().trim().optional(),
  ShippingCode: Joi.string().trim().optional(),
  TickerSymbol: Joi.string().trim().uppercase().optional(),

  companyType: Joi.string().valid('Customer', 'Partner', 'Vendor').optional(),
  Ownership: Joi.string().valid('Public', 'Private', 'Government').optional(),
  Employees: Joi.number().integer().min(1).optional(),
  AnnualRevenue: Joi.number().optional(),

  Tag: Joi.string().trim().optional(),
});

module.exports = { companySchema, companyUpdateSchema };
