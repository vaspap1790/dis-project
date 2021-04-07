import asyncHandler from 'express-async-handler';
import Access from '../models/accessModel.js';

// @desc    Add new access
// @route   POST /api/access
// @access  Private
const addNewAccess = asyncHandler(async (req, res) => {
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

export { addNewAccess };
