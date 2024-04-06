const { companySchema, companyUpdateSchema } = require('../models/joi/company.schema');
const { contactSchema, contactUpdateSchema } = require('../models/joi/contact.schema');
const { dealUpdateSchema, dealSchema } = require('../models/joi/deal.schema');
const { userUpdateSchema, userSchema, userLoginSchema } = require('../models/joi/user.schema');

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
        case 'deal':
          return dealUpdateSchema;
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
        case 'login':
          return userLoginSchema;
        case 'deal':
          return dealSchema;
        default:
          break;
      }
    }
  } catch (error) {
    throw error;
  }
}

module.exports = schemaSelector;
