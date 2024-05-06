const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().trim().required(),
  dueDate: Joi.date().allow('DD-MM-YYYY'),
  owner: Joi.string()
    .trim()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .message('Invalid MongoDB Id'),

  assignee: {
    name: Joi.string().trim(),
    avatar: Joi.string().trim(),
  },
  status: Joi.string().trim(),
  priority: Joi.string().trim(),
  description: Joi.string().trim().max(255),

  createdBy: Joi.string()
    .trim()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .message('Invalid MongoDB Id'),
  modifiedBy: Joi.string()
    .trim()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .message('Invalid MongoDB Id'),

  closedTime: Joi.date(),
  label: Joi.string().trim().max(16),
  reminder: Joi.date(),
  relatedTo: Joi.string()
    .trim()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .message('Invalid MongoDB Id'),
  relatedToRef: Joi.string().valid('Deal', 'Contact'),
  contactName: Joi.string()
    .trim()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .message('Invalid MongoDB Id'),
  locked: Joi.boolean(),
}).options({ abortEarly: false, stripUnknown: true });

const taskUpdateSchema = taskSchema.fork(
  ['title'],
  (schema) => schema.optional(),
);

module.exports = {
  taskSchema,
  taskUpdateSchema,
};
