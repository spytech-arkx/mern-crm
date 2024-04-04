const express = require('express');
const { validateParamsId, validateBodyData } = require('../middlewares/validator');
const sanitizeBodyData = require('../middlewares/sanitizer');
const {
  getCompanies,
  getCompanyById,
  deleteCompany,
  updateCompany,
  createCompanies,
} = require('../controllers/company.controller');

const companyRouter = express.Router();

companyRouter.post('/', sanitizeBodyData, validateBodyData, createCompanies);
companyRouter.get('/', getCompanies);
companyRouter.get('/:id', validateParamsId, getCompanyById);
companyRouter.patch(
  '/:id',
  validateParamsId,
  sanitizeBodyData,
  validateBodyData,
  updateCompany,
);
companyRouter.delete('/:id', validateParamsId, deleteCompany);

module.exports = companyRouter;
