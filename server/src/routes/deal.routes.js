const express = require("express");
const { validateParamsId, validateBodyData } = require("../middlewares/validator");
const { isAuth } = require("../middlewares/authenticator");
const sanitizeBodyData = require("../middlewares/sanitizer");
const {
  getDeals,
  getDealById,
  deleteDeal,
  updateDeal,
  createDeals,
} = require("../controllers/deal.controller");

const dealRouter = express.Router();
dealRouter.post("/", isAuth, sanitizeBodyData, validateBodyData, createDeals);
dealRouter.get("/", isAuth, getDeals);
dealRouter.get("/:id", isAuth, validateParamsId, getDealById);
dealRouter.patch(
  "/:id",
  isAuth,
  validateParamsId,
  sanitizeBodyData,
  validateBodyData,
  updateDeal,
);
dealRouter.delete("/:id", isAuth, validateParamsId, deleteDeal);

module.exports = dealRouter;
