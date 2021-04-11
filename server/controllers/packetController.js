import asyncHandler from 'express-async-handler';
import Packet from '../models/packetModel.js';
import Review from '../models/reviewModel.js';
import User from '../models/userModel.js';

// @desc    Fetch all packets
// @route   GET /api/packets
// @access  Public
const getPackets = asyncHandler(async (req, res) => {
  const packets = await Packet.find({}).populate('user', 'username');
  if (packets && packets.length !== 0) {
    res.json(packets);
  } else {
    res.status(404);
    throw new Error('No data Packets uploaded');
  }
});

// @desc    Fetch single packet
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

// @desc    Fetch all user packets
// @route   GET /api/packets/user/:id
// @access  Public
const getPacketsByUserId = asyncHandler(async (req, res) => {
  const packets = await Packet.find({ user: req.params.id });
  const userRating = await User.find({ _id: req.params.id }).select(
    'username rating numReviews -_id'
  );

  if (packets && packets.length !== 0) {
    const reviews = [];
    var i;
    for (i = 0; i < packets.length; i++) {
      const packetReview = await Review.find({ packet: packets[i]._id })
        .populate('packet', 'name')
        .populate('user', 'username');
      reviews.push(packetReview);
    }

    const data = {
      packets: packets,
      reviews: reviews,
      userRating: userRating[0]
    };

    res.json(data);
  } else {
    res.status(404);
    throw new Error('No items uploaded');
  }
});

export { getPackets, getPacketById, getPacketsByUserId };
