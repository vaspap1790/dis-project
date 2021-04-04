import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User'
    },
    packet: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Packet'
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
