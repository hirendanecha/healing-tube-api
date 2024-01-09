const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripe.controller");

router.post("/create-payment-intent", stripeController.createPaymentIntent);

module.exports = router;
