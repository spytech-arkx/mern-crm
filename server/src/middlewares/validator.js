const Joi = require("joi");
const schemaSelector = require("../helpers/schemaChoiceHandler");
const typeHandler = require("../helpers/typeHandler");
const { logger } = require("../utils/logger");

// When validate() throws, err contains an object with details about the validation failures.
// You can access these details using the following properties:
//     error.details: An array of objects representing each validation error.
//     error.details[i].message: The specific error message for each validation failure.
//     error.details[i].path: (e.g., "companyName" or "BillingAddress.Street").
// eslint-disable-next-line consistent-return

const validateObject = (obj, schema) => {
  const { error, value } = schema.validate(obj, {
    abortEarly: true,
    convert: true,
  });

  return error ? { error } : value;
};

const validateBodyData = (req, res, next) => {
  const { method } = req;
  const type = typeHandler(req.originalUrl);
  const schema = schemaSelector(type, method);

  const arr = Array.isArray(req.body) ? req.body : [req.body];
  const result = arr.map((obj) => validateObject(obj, schema));

  const validationError = result.find((item) => item.error);
  if (validationError) {
    logger.log("error", "Error caught at validation:");
    logger.log("error", validationError.error);
    return res.status(400).json({
      type: "ValidationError",
      message: "Validation failed :/",
      error: validationError.error,
    });
  }

  req.body = result;
  return next();
};

const validateParamsId = (req, res, next) => {
  // Validate the id parameter separately using Joi, I could use mongoose ofc
  const { error: invalidIdError } = Joi.string().hex().length(24).validate(req.params.id);
  if (invalidIdError) {
    return res.status(400).json({
      type: "ValidationError",
      message: "Invalid id format",
    });
  }
  return next();
};

module.exports = {
  validateBodyData,
  validateParamsId,
};

// TODO: validate the body, headers, cookies, formdata and queries next..
