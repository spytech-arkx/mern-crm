const Joi = require('joi');

const taskSchema = Joi.object({
  subject: Joi.string().trim().max(50).required(),
  dueDate: Joi.date(),
  owner: Joi.string()
    .trim()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .message('Invalid MongoDB Id'),

  status: Joi.string().trim().valid('To Do', 'In Progress', 'Completed', 'Deferred'),
  priority: Joi.string().trim().valid('P0', 'P1', 'P2'),
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
  tags: Joi.array().items(Joi.string().trim().max(16)),
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
  ['subject'],
  (schema) => schema.optional(),
);

module.exports = {
  taskSchema,
  taskUpdateSchema,
};
