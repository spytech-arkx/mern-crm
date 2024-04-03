/* eslint-disable newline-per-chained-call */
const Joi = require('joi');

const userSchema = Joi.object({
  // Main Information
  firstName: Joi.string().required().trim().min(1).max(50).messages({
    'string.base': '"firstName" should be a type of string',
    'string.empty': '"firstName" cannot be an empty string',
    'string.min': '"firstName" should be at least {#limit} characters long',
    'string.max': '"firstName" should be at most {#limit} characters long',
    'any.required': '"firstName" is required',
  }),
  lastName: Joi.string().required().trim().min(1).max(50).messages({
    'string.base': '"lastName" should be a type of string',
    'string.empty': '"lastName" cannot be an empty string',
    'string.min': '"lastName" should be at least {#limit} characters long',
    'string.max': '"lastName" should be at most {#limit} characters long',
    'any.required': '"lastName" is required',
  }),

  // Contact Information
  email: Joi.string().required().trim().lowercase().email().messages({
    'string.base': '"email" should be a type of string',
    'string.empty': '"email" cannot be an empty string',
    'string.email': '"email" is not a valid email',
    'any.required': '"email" is required',
  }),
  phone: Joi.string()
    .trim()
    .allow(Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/, 'phone number')), // You can adjust the regex for specific phone number formats
  mobile: Joi.string()
    .trim()
    .allow(Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/, 'phone number')), // You can adjust the regex for specific phone number formats

  // Address Information
  address: Joi.object({
    street: Joi.string().trim(),
    city: Joi.string().trim(),
    state: Joi.string().trim(),
    country: Joi.string().trim(),
    zipCode: Joi.string().trim(),
  }),

  // Login Information
  password: Joi.string()
    .required()
    .messages({ 'any.required': '"password is required"' }), // TODO: Add more complex password validation

  // User Details
  username: Joi.string()
    .trim()
    .lowercase()
    .regex(/^[a-z_.0-9]{4,16}$/)
    .messages({
      'string.base': '"username" should be a type of string',
      'string.empty': '"username" cannot be an empty string',
      'string.pattern': '"username" must be lowercase, only include numbers, alphabet and "_"',
      'any.required': '"username" is required',
    }),
  dateOfBirth: Joi.date(),
  website: Joi.string().trim().uri({ allowRelative: true }), // Allow empty website field
  avatar: Joi.string().trim().uri({ allowRelative: true }), // Allow empty avatar field

  // Preferences
  language: Joi.string().trim(),
  countryLocale: Joi.string().trim(),
  timeZone: Joi.string().trim(),
  dateFormat: Joi.string().trim(),
  timeFormat: Joi.string().trim(),

  // Roles and Permissions
  role: Joi.string().valid('admin', 'user', 'editor'),

  // Account Management
  addedBy: Joi.string().allow(''), // Allow empty addedBy field (assuming ObjectId is a string)
  modifiedBy: Joi.string().allow(''), // Allow empty modifiedBy field (assuming ObjectId is a string)
  addedTime: Joi.date(),
  modifiedTime: Joi.date(),
  isActive: Joi.boolean(),

  // Additional Information and preferences
  alias: Joi.string().trim(),
  grouping: Joi.string().trim(),
  sortOrder: Joi.string().trim(),
  confirm: Joi.boolean(),
  notes: Joi.string().trim(),
});

const userUpdateSchema = Joi.object({
  // Main Information
  firstName: Joi.string().trim().min(1).max(50).optional(),
  lastName: Joi.string().trim().min(1).max(50).optional(),

  // Contact Information
  email: Joi.string().trim().email({ allowUnicode: false }).optional(),
  phone: Joi.string()
    .trim()
    .pattern(/^\+(?:[0-9] ?){6,14}$/)
    .optional(), // Only allow phone numbers with "+" prefix
  mobile: Joi.string()
    .trim()
    .pattern(/^\+(?:[0-9] ?){6,14}$/)
    .optional(), // Only allow phone numbers with "+" prefix

  // Address Information
  address: Joi.object({
    street: Joi.string().trim().optional(),
    city: Joi.string().trim().optional(),
    state: Joi.string().trim().optional(),
    country: Joi.string().trim().optional(),
    zipCode: Joi.string().trim().optional(),
  }).optional(),

  // User Details (excluding password for security reasons)
  username: Joi.string().trim().optional(),
  dateOfBirth: Joi.date().optional(),
  website: Joi.string().trim().optional(),
  avatar: Joi.string().trim().optional(),

  // Preferences
  language: Joi.string().trim().optional(),
  countryLocale: Joi.string().trim().optional(),
  timeZone: Joi.string().trim().optional(),
  dateFormat: Joi.string().trim().optional(),
  timeFormat: Joi.string().trim().optional(),

  // Roles and Permissions (assuming these shouldn't be updated through user input)
  // role: Joi.string().valid('admin', 'user', 'editor').optional(), // Omit for security

  // Account Management (mostly read-only, so validation omitted here)
  // addedBy: Joi.string().custom(...).optional(), // Omit for security
  // modifiedBy: Joi.string().custom(...).optional(), // Omit for security
  // addedTime: Joi.date().optional(), // Omit, likely read-only
  // modifiedTime: Joi.date().optional(), // Omit, likely read-only
  // isActive: Joi.boolean().optional(), // Omit for security

  // Additional Information
  alias: Joi.string().trim().optional(),
  grouping: Joi.string().trim().optional(),
  sortOrder: Joi.string().trim().optional(),
  confirm: Joi.boolean().optional(),
  notes: Joi.string().trim().optional(),
});

module.exports = {
  userSchema,
  userUpdateSchema,
};
