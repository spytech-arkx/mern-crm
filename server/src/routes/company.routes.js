const express = require("express");
const { validateParamsId, validateBodyData } = require("../middlewares/validator");
const sanitizeBodyData = require("../middlewares/sanitizer");
const { isAuth } = require("../middlewares/authenticator");
const {
  getCompanies,
  getCompanyById,
  deleteCompany,
  updateCompany,
  createCompanies,
} = require("../controllers/company.controller");

const companyRouter = express.Router();
companyRouter.post("/", isAuth, sanitizeBodyData, validateBodyData, createCompanies);
companyRouter.get("/", isAuth, getCompanies);
companyRouter.get("/:id", isAuth, validateParamsId, getCompanyById);
companyRouter.patch(
  "/:id",
  isAuth,
  validateParamsId,
  sanitizeBodyData,
  validateBodyData,
  updateCompany,
);
companyRouter.delete("/:id", isAuth, validateParamsId, deleteCompany);

module.exports = companyRouter;
