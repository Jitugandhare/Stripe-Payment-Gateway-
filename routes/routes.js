const express = require('express');


// Load environment variables from .env file
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const route = express.Router();




// Create intent for payment
route.post('/create_intent', async (req, res) => {
    try {
        const intent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: req.body.currency || 'usd',
            amount_capturable: req.body.capture,
            
        });

        res.json({ client_secret: intent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Capture PaymentIntent route
route.post('/capture_intent/:id', async (req, res) => {
    try {
        const intentId = req.params.id;

        // Retrieve the PaymentIntent to check its status
        const intent = await stripe.paymentIntents.retrieve(intentId);

        // Check if the PaymentIntent is in a state that allows capturing
        if (intent.status === 'requires_capture') {
            // Capture the PaymentIntent
            const capturedIntent = await stripe.paymentIntents.capture(intentId);
            res.json({ intent: capturedIntent });
        } else {
            // Return an error if the PaymentIntent is not in the correct state
            res.status(400).json({ error: 'Cannot capture PaymentIntent. It must be in "requires_capture" state.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create refund route
route.post('/create_refund/:id', async (req, res) => {
    try {
        const intentId = req.params.id;

        // Retrieve the PaymentIntent to check its status
        const paymentIntent = await stripe.paymentIntents.retrieve(intentId);

        // Check if the PaymentIntent has a successful charge
        if (paymentIntent.status !== 'succeeded' || !paymentIntent.charges.data.length) {
            return res.status(400).json({
                error: {
                    message: 'This PaymentIntent does not have a successful charge to refund.',
                    type: 'invalid_request_error'
                }
            });
        }

        // Create a refund for the PaymentIntent
        const refund = await stripe.refunds.create({ payment_intent: intentId });

        res.json({ refund });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Get a List of all intents
route.get('/get_intents', async (req, res) => {
    try {
        const intents = await stripe.paymentIntents.list();

        res.json({ intents: intents.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { route }