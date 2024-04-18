const express = require('express');
const { validateParamsId, validateBodyData } = require('../middlewares/validator');
const { isAuth } = require('../middlewares/authenticator');
const sanitizeBodyData = require('../middlewares/sanitizer');
const {
  getLeads,
  getLeadById,
  deleteLead,
  updateLead,
  createLeads,
} = require('../controllers/lead.controller');

const leadRouter = express.Router();
leadRouter.use(isAuth);
leadRouter.post('/', sanitizeBodyData, validateBodyData, createLeads);
leadRouter.get('/', getLeads);
leadRouter.get('/:id', validateParamsId, getLeadById);
leadRouter.patch(
  '/:id',
  validateParamsId,
  sanitizeBodyData,
  validateBodyData,
  updateLead,
);
leadRouter.delete('/:id', validateParamsId, deleteLead);

module.exports = leadRouter;
