import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  paymentId: { type: String }, // Razorpay payment ID, if using Razorpay
  createdAt: { type: Date, default: Date.now },
  // Add more fields as needed (items, address, etc.)
});

export default mongoose.model('Order', OrderSchema);