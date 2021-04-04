import asyncHandler from 'express-async-handler';
import Packet from '../models/packetModel.js';

// @desc    Fetch all products
// @route   GET /api/packets
// @access  Public
const getPackets = asyncHandler(async (req, res) => {
  const packets = await Packet.find({});
  res.json(packets);
});

// @desc    Fetch single product
// @route   GET /api/packets/:id
// @access  Public
const getPacketById = asyncHandler(async (req, res) => {
  const packet = await Packet.findById(req.params.id);

  if (packet) {
    res.json(packet);
  } else {
    res.status(404);
    throw new Error('Packet not found');
  }
});

export { getPackets, getPacketById };
