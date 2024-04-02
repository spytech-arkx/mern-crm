const { companySchema, companyUpdateSchema } = require('../models/joi/company.schema');
const { contactSchema, contactUpdateSchema } = require('../models/joi/contact.schema');
const { userUpdateSchema, userSchema } = require('../models/joi/user.schema');

// eslint-disable-next-line consistent-return
function schemaSelector(type, method) {
  try {
    if (method === 'PATCH') {
      switch (type) {
        case 'company':
          return companyUpdateSchema;
        case 'contact':
          return contactUpdateSchema;
        case 'user':
          return userUpdateSchema;
        case 'task':
          break;
        default:
          break;
      }
    } else if (method === 'POST') {
      switch (type) {
        case 'company':
          return companySchema;
        case 'contact':
          return contactSchema;
        case 'user':
          return userSchema;
        case 'task':
          break;
        default:
          break;
      }
    }
  } catch (error) {
    throw error;
  }
}

module.exports = schemaSelector;
