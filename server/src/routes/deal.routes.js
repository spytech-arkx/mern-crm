const express = require('express');
const {
  getDealById,
  getDeals,
  updateDeal,
  deleteDeal,
  createDeal,
} = require('../controllers/deal.controller');
const { validateParamsId, validateBodyData } = require('../middlewares/validator');
const sanitizeBodyData = require('../middlewares/sanitizer');

const dealRouter = express.Router();

dealRouter.post('/', sanitizeBodyData, validateBodyData, createDeal);
dealRouter.get('/', getDeals);
dealRouter.get('/:id', validateParamsId, getDealById);
dealRouter.patch(
  '/:id',
  validateParamsId,
  sanitizeBodyData,
  validateBodyData,
  updateDeal,
);
dealRouter.delete('/:id', validateParamsId, deleteDeal);

module.exports = dealRouter;
