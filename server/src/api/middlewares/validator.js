const { body } = require('express-validator');

exports.validateContact = [
  // Main Information
  body('firstName').trim().notEmpty().withMessage('First name is required.'),
  body('lastName').trim().notEmpty().withMessage('Last name is required.'),

  // Contact Information
  body('contact.email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email address.'),
  body('contact.phone')
    .optional()
    .matches(
      /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/,
    )
    .withMessage('Please provide a valid phone number.'),
  body('contact.birthday')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Please provide a valid date for birthday.'),
  body('contact.notes')
    .optional()
    .isLength({ max: 80 })
    .withMessage('Notes can have a maximum of 80 characters.'),

  // Social Media Links
  body('socials.X')
    .optional()
    .matches(/twitter/g)
    .withMessage('Must provide a valid X(Formerly Twitter) handle.'),
  body('socials.LinkedIn')
    .optional()
    .matches(/linkedin/g)
    .withMessage('LinkedIn must be a valid LinkedIn profile URL.'),

  // Address Information (Optional)
  body('Address.Street').optional().trim(),
  body('Address.City').optional().trim(),
  body('Address.State').optional().trim(),
  body('Address.Country').optional().trim(),

  // Association Information
  body('Company').optional().isMongoId().withMessage('Invalid company ID.'),
  body('SkypeID')
    .optional()
    .matches(/^live:([a-zA-Z0-9][a-zA-Z0-9\-]{5,31})$/)
    .withMessage('Not a valid Skype ID.'),
];
