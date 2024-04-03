const Joi = require('joi');
const mongoose = require('mongoose');

const contactSchema = Joi.object({
  // Main Information
  firstName: Joi.string()
    .required()
    .trim()
    .regex(/[\W0-9]/, { invert: true }),
  lastName: Joi.string()
    .required()
    .trim()
    .regex(/[\W0-9]/, { invert: true }),

  // Contact Information
  // Restrict to ASCII emails for simplicity,
  email: Joi.string().trim().email({ allowUnicode: false }),
  phone: Joi.string()
    .trim()
    .pattern(
      /^(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/,
    ),
  birthday: Joi.date(),
  notes: Joi.string().trim().max(80),

  // Social Media Links
  socials: Joi.object().keys({
    X: Joi.string()
      .trim()
      .pattern(/twitter/),
    LinkedIn: Joi.string()
      .trim()
      .pattern(/linkedin/),
  }),

  // Address Information
  Address: Joi.object({
    Street: Joi.string().trim(),
    City: Joi.string().trim(),
    State: Joi.string().trim(),
    Country: Joi.string().trim(),
  }),

  // Association Information
  Company: Joi.string().custom((value) => {
    if (!Joi.ObjectId.validate(value)) {
      throw new Error('Invalid Company ID');
    }
    return value;
  }),
  SkypeID: Joi.string()
    .trim()
    .pattern(/^live:([a-zA-Z0-9][a-zA-Z0-9-]{5,31})$/),

  locked: Joi.boolean(),
  // Server-side logic information
  _id: Joi.string().custom((value, helper) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helper.error('Invalid Contact reference.');
    }
    return value;
  }),
});

const contactUpdateSchema = Joi.object({
  // Main Information
  firstName: Joi.string()
    .trim()
    .regex(/[\W0-9]/, { invert: true })
    .optional(),
  lastName: Joi.string()
    .trim()
    .regex(/[\W0-9]/, { invert: true })
    .optional(),

  // Contact Information
  email: Joi.string().trim().email({ allowUnicode: false }).optional(),
  phone: Joi.string()
    .trim()
    .pattern(
      /^(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/,
    )
    .optional(),
  birthday: Joi.date().optional(),
  notes: Joi.string().trim().max(80).optional(),

  // Social Media Links
  socials: Joi.object()
    .keys({
      X: Joi.string()
        .trim()
        .pattern(/twitter/)
        .optional(),
      LinkedIn: Joi.string()
        .trim()
        .pattern(/linkedin/)
        .optional(),
    })
    .optional(),

  // Address Information
  Address: Joi.object({
    Street: Joi.string().trim().optional(),
    City: Joi.string().trim().optional(),
    State: Joi.string().trim().optional(),
    Country: Joi.string().trim().optional(),
  }).optional(),

  // Association Information
  Company: Joi.string()
    .custom((value) => {
      if (!Joi.ObjectId.validate(value)) {
        throw new Error('Invalid Company ID');
      }
      return value;
    })
    .optional(),
  SkypeID: Joi.string()
    .trim()
    .pattern(/^live:([a-zA-Z0-9][a-zA-Z0-9-]{5,31})$/)
    .optional(),

  locked: Joi.boolean().optional(),

  // Omit server-side fields like _id and type
});

module.exports = { contactSchema, contactUpdateSchema };
