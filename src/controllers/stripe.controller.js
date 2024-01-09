const environment = require("../environments/environment");
const stripe = require("stripe")(environment.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async function (req, res) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });
  res.send(paymentIntent);
};
