const Joi = require('joi');

const contactSchema = Joi.object({
  // Main Information
  salutation: Joi.string().valid('Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', ''),
  firstName: Joi.string()
    .required()
    .trim()
    .regex(/^[a-zA-Z\s]+$/)
    .error(new Error('Please provide a valid name.')),
  lastName: Joi.string()
    .required()
    .trim()
    .regex(/^[a-zA-Z\s]+$/)
    .error(new Error('Please provide a valid name.')),

  // Contact Information
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }), // Allow null for optional fields
  phone: Joi.string()
    .trim()
    .regex(
      /^(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/,
    ),
  birthday: Joi.date(),
  address: Joi.object({
    street: Joi.string().trim(),
    city: Joi.string().trim(),
    state: Joi.string().trim(),
    country: Joi.string().trim(),
    zipCode: Joi.string().trim(),
  }),
  description: Joi.string().trim().max(80),
  emailOptOut: Joi.boolean(),

  // Social Media Links
  socials: Joi.object({
    X: Joi.string()
      .trim()
      .regex(/twitter/),
    LinkedIn: Joi.string()
      .trim()
      .regex(/linkedin/),
  }),

  // Sales pipeline specific infos
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
  ),

  // Association Information
  title: Joi.string().trim().max(60),
  skypeId: Joi.string()
    .trim()
}).options({ abortEarly: false, stripUnknown: true });

const contactUpdateSchema = contactSchema.fork(
  ['firstName', 'lastName'],
  (schema) => schema.optional(),
);

module.exports = { contactSchema, contactUpdateSchema };
