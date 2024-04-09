const express = require('express');
const { validateParamsId, validateBodyData } = require('../middlewares/validator');
const sanitizeBodyData = require('../middlewares/sanitizer');
const {
  getDeals,
  getDealById,
  deleteDeal,
  updateDeal,
  createDeals,
} = require('../controllers/deal.controller');

const dealRouter = express.Router();

dealRouter.post('/', sanitizeBodyData, validateBodyData, createDeals);
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
