const express = require('express');
const sanitize = require('../middlewares/sanitizer');
const validateObjectId = require('../middlewares/id.validator');
const router = express.Router();
const {
  getDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal,
} = require('../controllers/deal.controller');

router.get('/:id', validateObjectId, getDealById);
router.post('/', sanitize, createDeal);
router.put('/:id', validateObjectId, sanitize, updateDeal);
router.delete('/:id', validateObjectId, deleteDeal);

router.get('/', getDeals);
module.exports = router;
