const { companySchema, companyUpdateSchema } = require('../models/joi/company.schema');
const { contactSchema, contactUpdateSchema } = require('../models/joi/contact.schema');

// eslint-disable-next-line consistent-return
function schemaSelector(type, method) {
  try {
    if (method === 'PATCH') {
      switch (type) {
        case 'company':
          return companyUpdateSchema;
        case 'contact':
          return contactUpdateSchema;
        case 'task':
          break;
        case 'user':
          break;
        default:
          break;
      }
    }

    switch (type) {
      case 'company':
        return companySchema;
      case 'contact':
        return contactSchema;
      case 'task':
        break;
      case 'user':
        break;
      default:
        break;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = schemaSelector;
