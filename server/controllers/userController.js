const asyncHandler = require('express-async-handler');
const { generateToken } = require('../utils/generateToken.js');
const User = require('../models/userModel.js');
const Packet = require('../models/packetModel.js');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid Credentials');
  }
});

// @desc    register a new user
// @route   POST /api/users
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('This email is already in use');
  }

  const user = await User.create({
    username,
    email,
    password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    delete a new user
// @route   DELETE /api/users/delete/:id
// @access  Public
exports.deleteUser = asyncHandler(async (req, res) => {
  const result = await User.findByIdAndDelete(req.params.id);
  res.json(result);
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user purchases
// @route   GET /api/users/purchases/:id
// @access  Public
exports.getUserPurchases = asyncHandler(async (req, res) => {
  const packets = await Packet.find({ soldTo: req.params.id }).populate(
    'user',
    'username'
  );
  res.json(packets);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { username, email, password } = req.body;
  const userExists = email !== user.email && (await User.findOne({ email }));

  if (userExists) {
    res.status(400);
    throw new Error('This email is already in use');
  }

  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
