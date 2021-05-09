const asyncHandler = require('express-async-handler');
const Packet = require('../models/packetModel.js');
const Review = require('../models/reviewModel.js');
const Access = require('../models/accessModel.js');

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
exports.createPacketReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const packetId = req.params.id;

  const packet = await Packet.findById(packetId);

  if (packet) {
    const accessToThisPacket = await Access.find({ packet: packetId });
    const usersEligibleToRate = accessToThisPacket.filter(
      (access) => access.user !== req.user._id
    );

    const pastReviews = await Review.find({
      packet: packetId,
      user: req.user._id
    });

    if (pastReviews.length > 0) {
      res.status(400);
      throw new Error('Data packet already reviewed');
    }

    if (packet.user === req.user._id || usersEligibleToRate.length === 0) {
      res.status(400);
      throw new Error('Not authorised!');
    }

    const packetReviews = await Review.find({ packet: packetId });

    const review = new Review({
      user: req.user._id,
      packet: packetId,
      rating: Number(rating),
      comment: comment
    });

    packetReviews.push(review);

    packet.numReviews = packetReviews.length;

    packet.rating =
      packetReviews.reduce((acc, item) => item.rating + acc, 0) /
      packetReviews.length;

    await review.save();
    await packet.save();

    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Data packet not found');
  }
});
