const asyncHandler = require('express-async-handler');
const Access = require('../models/accessModel.js');

// @desc    Add new access
// @route   POST /api/access
// @access  Private
exports.addNewAccess = asyncHandler(async (req, res) => {
  const { packetId } = req.body;

  if (packetId === undefined) {
    res.status(400);
    throw new Error('Something went wrong');
    return;
  } else {
    const access = new Access({ user: req.user._id, packet: packetId });
    const addedAccess = await access.save();
    res.status(201).json(addedAccess);
  }
});

// @desc    Fetch all user purchases
// @route   GET /api/access/user/:id
// @access  Private
exports.getAccessesByUserId = asyncHandler(async (req, res) => {
  const accesses = await Access.find({ user: req.params.id }).populate(
    'packet',
    'name image'
  );

  res.json(accesses);
});
