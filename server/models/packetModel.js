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
      default: 0
    },
    numReviews: {
      type: Number,
      default: 0
    },
    ipfsHashes: {
      type: [String],
      required: true,
      default: []
    },
    encryptionKeys: {
      type: [String],
      required: true,
      default: []
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
