// orders.js
import dotenv from 'dotenv';
dotenv.config();
import Razorpay from 'razorpay';
import express from 'express';

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ✅ Razorpay order creation route
router.post('/create-razorpay-order', async (req, res) => {
  const { amount, currency = 'INR' } = req.body;
  try {
    const options = {
      amount: amount * 100, // amount in paise
      currency,
      receipt: `receipt_order_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error('Razorpay order error:', err); // Helpful for debugging
    res.status(500).json({ error: err.message });
  }
});

export default router;
