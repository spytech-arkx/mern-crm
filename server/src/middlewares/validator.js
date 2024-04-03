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

exports.validateDeal = [
  // Validate and sanitize fields
  body('deal_name').trim().isString().notEmpty().withMessage('Deal name is required.'),
  body('description').trim().isString(),
  body('amount')
    .trim()
    .isNumeric()
    .notEmpty()
    .withMessage('This feild is required.')
    .custom((value) => {
      if (parseFloat(value) < 0) {
        throw new Error('Amount must be greater than or equal to 0');
      }
      return true;
    }),
  ,
  body('stage')
    .trim()
    .isString()
    .notEmpty()
    .custom((value) => {
      const validStages = ['Qualification', 'Negotiation', 'Closure', 'Other'];
      if (!validStages.includes(value)) {
        throw new Error('Invalid stage value');
      }
      return true;
    }),
  body('company')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('This feild is required.')
    .isMongoId()
    .withMessage('Invalid company ID.'),
  ,
  body('contacts')
    .custom((value) => {
      if (typeof value === 'string') {
        // Check if the single value is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error(`Invalid contact id: ${value}`);
        }
      } else if (Array.isArray(value)) {
        // Check if each value in the array is a valid MongoDB ObjectId
        for (const contact of value) {
          if (!mongoose.Types.ObjectId.isValid(contact)) {
            throw new Error(`Invalid contact id: ${contact}`);
          }
        }
      } else {
        throw new Error('Contacts must be a single ObjectId or an array of ObjectIds');
      }
      return true;
    })
    .isArray({ min: 1 })
    .withMessage('Contacts must be provided as an array with at least one ObjectId'),
  body('close_date')
    .trim()
    .isISO8601()
    .withMessage('Close date must be a valid ISO 8601 date string'),
];
