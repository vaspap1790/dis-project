import express from 'express';
import asyncHandler from 'express-async-handler';
import Packet from '../models/packetModel.js';

const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/packets
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const packets = await Packet.find({});
    res.json(packets);
  })
);

// @desc    Fetch single product
// @route   GET /api/packets/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const packet = await Packet.findById(req.params.id);

    if (packet) {
      res.json(packet);
    } else {
      res.status(404);
      throw new Error('Packet not found');
    }
  })
);

export default router;
