const express = require("express");
const router = express.Router();
const {
  getDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal,
} = require("../controllers/deal.controller");

router.get("/:id", getDealById);
router.post("/", createDeal);
router.put("/:id", updateDeal);
router.delete("/:id", deleteDeal);

router.get("/", getDeals);
module.exports = router;
