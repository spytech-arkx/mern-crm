const { companySchema, companyUpdateSchema } = require('../models/joi/company.schema');
const { contactSchema, contactUpdateSchema } = require('../models/joi/contact.schema');
const { dealUpdateSchema, dealSchema } = require('../models/joi/deal.schema');
const { leadUpdateSchema, leadSchema } = require('../models/joi/lead.schema');
const { taskUpdateSchema, taskSchema } = require('../models/joi/task.schema');
const {
  userUpdateSchema,
  userSchema,
  userLoginSchema,
} = require('../models/joi/user.schema');

// eslint-disable-next-line consistent-return
function schemaSelector(type, method) {
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
      case 'lead':
        return leadUpdateSchema;
      case 'task':
        return taskUpdateSchema;
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
      case 'lead':
        return leadSchema;
      case 'task':
        return taskSchema;
      default:
        break;
    }
  }
}

module.exports = schemaSelector;
