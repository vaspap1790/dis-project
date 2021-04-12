import mongoose from 'mongoose';

const packetSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false,
      default: '/images/sample.jpg'
    },
    category: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0
    },
    ipfsHash: {
      type: Number,
      required: true,
      default: 0
    },
    encryption_key: {
      type: Number,
      required: true,
      default: 0
    },
    price: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Packet = mongoose.model('Packet', packetSchema);

export default Packet;
