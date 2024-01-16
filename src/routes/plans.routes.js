const express = require("express");
const router = express.Router();
const plansController = require("../controllers/plans.controller");

router.get("/", plansController.getPlans);

module.exports = router;
