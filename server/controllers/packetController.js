const asyncHandler = require('express-async-handler');
const Packet = require('../models/packetModel.js');
const Review = require('../models/reviewModel.js');
const User = require('../models/userModel.js');

// const mongoose = require('mongoose');
// mongoose.set('debug', true);

const Cryptr = require('cryptr');
const cryptr = new Cryptr(`${process.env.ENCRYPT_KEY}`);

// @desc    Fetch all packets
// @route   GET /api/packets
// @access  Public
exports.getPackets = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const ratings = [];

  const page = Number(req.query.pageNumber) || 1;
  const sorting = req.query.sorting.split('_');
  let sortParameter = sorting[0];
  let sortCriteria = sorting[1].trim() === 'desc' ? -1 : 1;
  let sort = {};
  sort[`${sortParameter}`] = sortCriteria;

  req.query.rating1.trim() === 'true' ? ratings.push(1, 1.5) : null;
  req.query.rating2.trim() === 'true' ? ratings.push(2, 2.5) : null;
  req.query.rating3.trim() === 'true' ? ratings.push(3, 3.5) : null;
  req.query.rating4.trim() === 'true' ? ratings.push(4, 4.5) : null;
  req.query.rating5.trim() === 'true' ? ratings.push(5) : null;
  const priceFrom = Number(req.query.priceFrom) || 0;
  const priceTo = Number(req.query.priceTo) || 0;
  const keyword = req.query.keyword;

  const category = req.query.category;

  let searchObject = {};
  searchObject.sold = false;

  if (keyword) {
    searchObject.name = {
      $regex: req.query.keyword,
      $options: 'i' //case insensitive
    };
  }

  if (category !== 'undefined' && category !== 'All Categories') {
    searchObject.category = category;
  }

  if (ratings.length !== 0) {
    searchObject.ownerRating = {
      $in: ratings
    };
  }

  if (priceFrom !== 0 || priceTo !== 0) {
    searchObject.price = {
      $gte: priceFrom,
      $lte: priceTo
    };
  }

  const count = await Packet.countDocuments(searchObject);
  const packets = await Packet.find(searchObject)
    .populate('user', 'username rating numReviews')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort(sort);

  maxPrice = 0;
  packets.forEach((packet) => {
    if (packet.price !== null && packet.price > maxPrice) {
      maxPrice = packet.price;
    }
  });

  res.json({ packets, page, pages: Math.ceil(count / pageSize), maxPrice });
});

// @desc    Fetch single packet
// @route   GET /api/packets/:id
// @access  Public
exports.getPacketById = asyncHandler(async (req, res) => {
  let packet = await Packet.findById(req.params.id)
    .populate('user', 'username rating numReviews')
    .populate('soldTo', 'username');
  if (packet) {
    res.json(packet);
  } else {
    res.status(404);
    throw new Error('Packet not found');
  }
});

// @desc    Fetch packet keys
// @route   GET /api/packets/keys/:id
// @access  Public
exports.getPacketKeys = asyncHandler(async (req, res) => {
  let packet = await Packet.findById(req.params.id);

  if (packet) {
    let keys = [];
    for (var i = 0; i < packet.encryptionKeys.length; i++) {
      keys.push(cryptr.decrypt(packet.encryptionKeys[i]));
    }
    let ipfsHashes = packet.ipfsHashes;
    res.json({ keys, ipfsHashes });
  } else {
    res.status(404);
    throw new Error('Packet not found');
  }
});

// @desc    Fetch all user packets
// @route   GET /api/packets/user/:id
// @access  Public
exports.getPacketsByUserId = asyncHandler(async (req, res) => {
  const pageSize = 10;

  const page = Number(req.query.pageNumber) || 1;
  const sorting = req.query.sorting.split('_');
  let sortParameter = sorting[0];
  let sortCriteria = sorting[1].trim() === 'desc' ? -1 : 1;
  let sort = {};
  sort[`${sortParameter}`] = sortCriteria;

  const count = await Packet.countDocuments({ user: req.params.id });
  const packets = await Packet.find({ user: req.params.id })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort(sort);

  if (packets && packets.length !== 0) {
    res.json({ packets, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error('No data Packets uploaded');
  }
});

// @desc    Fetch user details
// @route   GET /api/packets/userDetails/:id
// @access  Public
exports.getUserDetails = asyncHandler(async (req, res) => {
  const packetsLength = await Packet.countDocuments({ user: req.params.id });
  const user = await User.findById(req.params.id);
  const reviews = await Review.find({ user: req.params.id })
    .populate('reviewer', 'username')
    .populate('packet', 'name');
  let data = {};

  data = {
    reviews: reviews,
    userRating: user,
    numOfPackets: packetsLength
  };

  res.json(data);
});

// @desc    Create a packet
// @route   POST /api/packets
// @access  Private
exports.createPacket = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    category,
    ipfsHashes,
    encryptionKeys
  } = req.body;

  const encryptedEncryptionKeys = [];

  for (var i = 0; i < encryptionKeys.length; i++) {
    encryptedEncryptionKeys.push(cryptr.encrypt(encryptionKeys[i]));
  }

  const packet = new Packet({
    name: name,
    price: price,
    user: req.user._id,
    category: category,
    description: description,
    image: image,
    ipfsHashes: ipfsHashes,
    encryptionKeys: encryptedEncryptionKeys
  });

  const createdPacket = await packet.save();
  res.status(201).json(createdPacket);
});

// @desc    Update a packet
// @route   PUT /api/packets/:id
// @access  Private
exports.updatePacket = asyncHandler(async (req, res) => {
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
exports.getTopPackets = asyncHandler(async (req, res) => {
  const packets = await Packet.find({ sold: false })
    .sort({ rating: -1 })
    .limit(5);

  res.json(packets);
});
