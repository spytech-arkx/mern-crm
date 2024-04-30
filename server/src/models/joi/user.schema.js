const Joi = require('joi');

const userSchema = Joi.object({
  firstName: Joi.string().required().trim().min(1).max(50),
  lastName: Joi.string().required().trim().min(1).max(50),
  email: Joi.string().required().trim().email().lowercase(),
  phone: Joi.string()
    .trim()
    .regex(
      /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(?([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\)?\s*)?([2-9][02-9]{2})\s*(?:[.-]\s*)?)([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,
    ), // Refined phone validation
  address: Joi.object({
    street: Joi.string().trim(),
    city: Joi.string().trim(),
    state: Joi.string().trim(),
    country: Joi.string().trim(),
    zipCode: Joi.string().trim(),
  }),
  username: Joi.string().trim().alphanum().lowercase(),
  password: Joi.string().required(),
  dateOfBirth: Joi.date(),
  website: Joi.string()
    .trim()
    .regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,6})([/\w .-]*)*\/?$/),
  avatar: Joi.string().trim(),
  language: Joi.string().trim(),
  countryLocale: Joi.string().trim(),
  timeZone: Joi.string().trim(),
  dateFormat: Joi.string().trim(),
  timeFormat: Joi.string().trim(),

  role: Joi.string().valid('admin', 'user', 'editor'),

  confirm: Joi.boolean(),
  notes: Joi.string().trim().max(255),
}).options({ abortEarly: false, stripUnknown: true });

const userUpdateSchema = userSchema.fork(
  ['firstName', 'lastName', 'email', 'password'],
  (schema) => schema.optional(),
);

module.exports = {
  userSchema,
  userUpdateSchema,
};
