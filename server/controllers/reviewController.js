import asyncHandler from 'express-async-handler';
import Packet from '../models/packetModel.js';
import Review from '../models/reviewModel.js';

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
const createPacketReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const packetId = req.params.id;

  const packet = await Packet.findById(packetId);

  if (packet) {
    const pastReviews = await Review.find({
      packet: packetId,
      user: req.user._id
    });

    if (pastReviews.length > 0) {
      res.status(400);
      throw new Error('Data packet already reviewed');
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

export { createPacketReview };
