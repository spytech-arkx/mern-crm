const Joi = require('joi');
const contactSchema = require('../models/joi/contact.schema');

// TO-DO : handle bulk documents validations.
const validateBodyData = (req, res, next) => {
  // validate the body, headers, cookies, formdata and queries next..
  const { error: invalidDataError } = contactSchema.validate(req.body, {
    abortEarly: 'true',
    convert: 'false',
  });
  if (invalidDataError) {
    return res.status(400).json({
      type: 'ValidationError',
      errors: invalidDataError.details,
      message: 'Bad Request',
    });
  }
  return next();
};

const validateParamsId = (req, res, next) => {
  // Validate the id parameter separately using Joi, I could use mongoose ofc
  const { error: invalidIdError } = Joi.string().hex().length(24).validate(req.params.id);
  if (invalidIdError) {
    return res.status(400).json({
      type: 'ValidationError',
      message: 'Invalid id format',
      path: '_id',
    });
  }
  return next();
};

module.exports = {
  validateBodyData,
  validateParamsId,
};
