import asyncHandler from 'express-async-handler';
import Packet from '../models/packetModel.js';
import Review from '../models/reviewModel.js';
import User from '../models/userModel.js';

// @desc    Fetch all packets
// @route   GET /api/packets
// @access  Public
const getPackets = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i' //case insensitive
        }
      }
    : {};

  const count = await Packet.countDocuments({ ...keyword });
  const packets = await Packet.find({ ...keyword })
    .populate('user', 'username')
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (packets && packets.length !== 0) {
    res.json({ packets, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error('No data Packets uploaded');
  }
});

// @desc    Fetch single packet
// @route   GET /api/packets/:id
// @access  Public
const getPacketById = asyncHandler(async (req, res) => {
  let packet = await Packet.findById(req.params.id).populate(
    'user',
    'username'
  );
  const reviews = await Review.find({ packet: req.params.id }).populate(
    'user',
    'username'
  );

  if (packet) {
    const data = { packet, reviews };
    res.json(data);
  } else {
    res.status(404);
    throw new Error('Packet not found');
  }
});

// @desc    Fetch single packet
// @route   GET /api/packets/data/:id
// @access  Public
const getPacketDataById = asyncHandler(async (req, res) => {
  let packet = await Packet.findById(req.params.id).populate(
    'user',
    'username'
  );

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
  const userRating = await User.findById(req.params.id);
  let data = {};

  if (packets && packets.length !== 0) {
    const reviews = [];
    for (var i = 0; i < packets.length; i++) {
      const packetReview = await Review.find({ packet: packets[i]._id })
        .populate('packet', 'name')
        .populate('user', 'username');
      if (packetReview.length === 1) {
        reviews.push(packetReview[0]);
      }
      if (packetReview.length > 1) {
        for (var j = 0; j < packetReview.length; j++) {
          reviews.push(packetReview[j]);
        }
      }
    }

    const packetsWithRatings = packets.filter((packet) => packet.rating !== 0);

    userRating.numReviews = reviews.length;
    if (packetsWithRatings.length !== 0) {
      userRating.rating =
        packetsWithRatings.reduce((acc, item) => item.rating + acc, 0) /
        packetsWithRatings.length;
    }

    data = {
      packets: packets,
      reviews: reviews,
      userRating: userRating
    };

    await userRating.save();
  } else {
    data = {
      packets: [],
      reviews: [],
      userRating: userRating
    };
  }
  res.json(data);
});

// @desc    Create a packet
// @route   POST /api/packets
// @access  Private
const createPacket = asyncHandler(async (req, res) => {
  const { name, price, description, image, category, sample } = req.body;

  const packet = new Packet({
    name: name,
    price: price,
    user: req.user._id,
    category: category,
    numReviews: 0,
    description: description,
    image: image,
    sample: sample
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

// @desc    Get top rated packets
// @route   GET /api/packets/top
// @access  Public
const getTopPackets = asyncHandler(async (req, res) => {
  const packets = await Packet.find({}).sort({ rating: -1 }).limit(5);

  res.json(packets);
});

export {
  getPackets,
  getPacketById,
  getPacketsByUserId,
  createPacket,
  updatePacket,
  getTopPackets,
  getPacketDataById
};
