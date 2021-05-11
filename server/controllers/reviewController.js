const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
const Review = require('../models/reviewModel.js');

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
exports.createUserReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const userId = req.params.id;
  const reviewerId = req.user._id;

  const user = await User.findById(userId);

  if (user) {
    const pastReviews = await Review.find({
      reviewer: reviewerId,
      user: userId
    });

    if (pastReviews.length > 0) {
      res.status(400);
      throw new Error('User already reviewed');
    }

    const review = new Review({
      user: userId,
      reviewer: reviewerId,
      rating: Number(rating),
      comment: comment
    });
    await review.save();

    const userReviews = await Review.find({
      user: userId
    });

    user.numReviews = userReviews.length;

    user.rating =
      userReviews.reduce((acc, item) => item.rating + acc, 0) /
      userReviews.length;

    await user.save();

    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
