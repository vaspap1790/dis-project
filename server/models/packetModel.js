const mongoose = require('mongoose');

const packetSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User'
    },
    soldTo: {
      type: mongoose.Schema.Types.ObjectId,
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
    },
    sold: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Packet = mongoose.model('Packet', packetSchema);

module.exports = Packet;
