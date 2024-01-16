const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripe.controller");

router.post("/create-payment-intent", stripeController.createPaymentIntent);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeController.webhook
);

module.exports = router;
