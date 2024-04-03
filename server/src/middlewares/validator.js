const Joi = require('joi');
const schemaSelector = require('../helpers/schemaChoiceHandler');
const typeHandler = require('../helpers/typeHandler');

// When validate() throws, err contains an object with details about the validation failures.
// You can access these details using the following properties:
//     error.details: An array of objects representing each validation error.
//     error.details[i].message: The specific error message for each validation failure.
//     error.details[i].path: (e.g., "companyName" or "BillingAddress.Street").
// eslint-disable-next-line consistent-return
const validateBodyData = (req, res, next) => {
  const { method } = req;
  const type = typeHandler(req.originalUrl);
  const { error, value } = schemaSelector(type, method).validate(req.body, {
    abortEarly: 'true',
    convert: 'false',
  });
  // Validation successful, continue processing
  if (error) {
    // handle it here and now.
    return res.status(400).json({
      type: 'ValidationError',
      message: 'Validation failed :/',
      errors: error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      })),
    });
  }
  req.body = value;
  next();
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

// TODO: validate the body, headers, cookies, formdata and queries next..
// TODO : handle bulk documents validations.
