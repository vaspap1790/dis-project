const mongoose = require('mongoose');

const actionSchema = mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      require: false,
      ref: 'User'
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      require: false,
      ref: 'User'
    },
    packet: {
      type: mongoose.Schema.Types.ObjectId,
      require: false,
      ref: 'Packet'
    },
    type: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'Pending'
    },
    showToRequester: {
      type: Boolean,
      default: true
    },
    showToReceiver: {
      type: Boolean,
      default: true
    },
    readByReceiver: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const ACTION = mongoose.model('ACTION', actionSchema);

module.exports = ACTION;
