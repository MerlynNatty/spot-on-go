import mongoose from 'mongoose';

const SlotSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  isFree: { type: Boolean, default: true }
});

export default mongoose.model('Slot', SlotSchema);
