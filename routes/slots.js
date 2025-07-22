import express from 'express';
import Slot from '../models/Slot.js';

const router = express.Router();

// Get all slots
router.get('/', async (req, res) => {
  const slots = await Slot.find();
  res.json(slots);
});

// Book a slot (mark as not free)
router.post('/:id/book', async (req, res) => {
  const slot = await Slot.findByIdAndUpdate(req.params.id, { isFree: false }, { new: true });
  res.json(slot);
});

export default router;
