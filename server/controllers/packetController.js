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

// @desc    Create a packet
// @route   POST /api/packets
// @access  Private
const createPacket = asyncHandler(async (req, res) => {
  const packet = new Packet({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    category: 'Sample category',
    numReviews: 0,
    description: 'Sample description'
  });

  const createdPacket = await packet.save();
  res.status(201).json(createdPacket);
});

// @desc    Update a packet
// @route   PUT /api/packets/:id
// @access  Private
const updatePacket = asyncHandler(async (req, res) => {
  const { name, price, description, image, category } = req.body;

  const packet = await Packet.findById(req.params.id);

  if (packet) {
    packet.name = name;
    packet.price = price;
    packet.description = description;
    packet.image = image;
    packet.category = category;

    const updatedPacket = await packet.save();
    res.json(updatedPacket);
  } else {
    res.status(404);
    throw new Error('Packet not found');
  }
});

export {
  getPackets,
  getPacketById,
  getPacketsByUserId,
  createPacket,
  updatePacket
};
