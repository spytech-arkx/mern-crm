const Joi = require('joi');

const leadSchema = Joi.object({
  // Identification and Basic Information
  firstName: Joi.string()
    .trim()
    .required()
    .pattern(/^[a-zA-Z\s]+$/)
    .message('Please provide a valid name.'),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[a-zA-Z\s]+$/)
    .message('Please provide a valid name.'),
  title: Joi.string().max(26).trim(),
  owner: Joi.string()
    .trim()
    .pattern(/^[0-9a-fA-F]{24}$/),
  description: Joi.string().trim().max(255),
  company: Joi.string()
    .trim()
    .pattern(/^[0-9a-fA-F]{24}$/),

  // Address Information
  address: Joi.object({
    Street: Joi.string().trim(),
    City: Joi.string().trim(),
    State: Joi.string().trim(),
    Country: Joi.string().trim(),
    PostalCode: Joi.string().trim(),
  }),

  // Contact Information
  email: Joi.string().trim().email(),
  phone: Joi.string()
    .trim()
    .pattern(
      /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/,
    )
    .message('Please provide a valid phone number.'),
  website: Joi.string().trim().uri(),

  // Lead Qualification and Source
  leadSource: Joi.string().valid(
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
  ),
  leadStatus: Joi.string().valid(
    'Not Contacted',
    'Not Qualified',
    'Qualified',
    'Contacted',
    'Lost Lead',
  ),
  industry: Joi.string().trim().max(30),
  numberOfEmployees: Joi.number().integer().min(1),
  annualRevenue: Joi.number().precision(2),

  tag: Joi.string().trim(),
  rating: Joi.string()
    .trim()
    .valid('Aqcuired', 'Active', 'Market Failed', 'Project Cancelled', 'Shut Down'),

  // Communication Preferences
  emailOptOut: Joi.boolean(),
  skypeId: Joi.string()
    .trim()
    .pattern(/^live:([a-zA-Z0-9][a-zA-Z0-9-]{5,31})$/)
    .message('Not a valid Skype ID.'),

  // System Information
  createdBy: Joi.string()
    .trim()
    .pattern(/^[0-9a-fA-F]{24}$/),
  modifiedBy: Joi.string()
    .trim()
    .pattern(/^[0-9a-fA-F]{24}$/),
  salutation: Joi.string().valid('Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.'),

  // Conversion Information (Optional)
  converted: Joi.object({
    ConvertedDate: Joi.date(),
    ConvertedBy: Joi.string()
      .trim()
      .pattern(/^[0-9a-fA-F]{24}$/),
    ConvertedContact: Joi.string()
      .trim()
      .pattern(/^[0-9a-fA-F]{24}$/),
    ConvertedDeal: Joi.string()
      .trim()
      .pattern(/^[0-9a-fA-F]{24}$/),
  }),

  // Additional Attributes
  isConverted: Joi.boolean(),
  birthday: Joi.date(),

  // Security and Permissions
  locked: Joi.boolean(),
}).options({ abortEarly: false, stripUnknown: true });

const leadUpdateSchema = leadSchema.fork(
  ['firstName', 'lastName'],
  (schema) => schema.optional(),
);

module.exports = {
  leadSchema,
  leadUpdateSchema,
};
