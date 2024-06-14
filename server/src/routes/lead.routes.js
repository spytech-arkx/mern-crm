const express = require("express");
const { validateParamsId, validateBodyData } = require("../middlewares/validator");
const { isAuth } = require("../middlewares/authenticator");
const sanitizeBodyData = require("../middlewares/sanitizer");
const {
  getLeads,
  getLeadById,
  deleteLead,
  updateLead,
  createLeads,
} = require("../controllers/lead.controller");

const leadRouter = express.Router();
leadRouter.post("/", isAuth, sanitizeBodyData, validateBodyData, createLeads);
leadRouter.get("/", isAuth, getLeads);
leadRouter.get("/:id", isAuth, validateParamsId, getLeadById);
leadRouter.patch(
  "/:id",
  isAuth,
  validateParamsId,
  sanitizeBodyData,
  validateBodyData,
  updateLead,
);
leadRouter.delete("/:id", isAuth, validateParamsId, deleteLead);

module.exports = leadRouter;
