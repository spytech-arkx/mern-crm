const express = require('express');
const {
  getContactById,
  getContacts,
  updateContact,
  deleteContact,
  createContacts,
} = require('../controllers/contact.controller');
const { validateParamsId, validateBodyData } = require('../middlewares/validator');
const sanitizeBodyData = require('../middlewares/sanitizer');
const { isAuth } = require('../middlewares/authenticator');

const contactRouter = express.Router();
contactRouter.use(isAuth);
contactRouter.post('/', sanitizeBodyData, validateBodyData, createContacts);
contactRouter.get('/', getContacts);
contactRouter.get('/:id', validateParamsId, getContactById);
contactRouter.patch(
  '/:id',
  validateParamsId,
  sanitizeBodyData,
  validateBodyData,
  updateContact,
);
contactRouter.delete('/:id', validateParamsId, deleteContact);

// contactRouter.get('/analytics')
// contactRouter.get('/analytics/:id')

module.exports = contactRouter;
