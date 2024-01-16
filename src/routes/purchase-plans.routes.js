const express = require("express");
const router = express.Router();
const purchasePlansController = require("../controllers/purchase-plans.controller");

router.get("/:id", purchasePlansController.getMyPlans);
router.post("/purchase-plan", purchasePlansController.createPlans);

module.exports = router;
