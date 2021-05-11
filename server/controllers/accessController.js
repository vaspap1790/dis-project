const asyncHandler = require('express-async-handler');
const Access = require('../models/accessModel.js');

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
