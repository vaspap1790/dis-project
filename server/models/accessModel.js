import mongoose from 'mongoose';

const accessSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: false,
      ref: 'User'
    },
    packet: {
      type: mongoose.Schema.Types.ObjectId,
      require: false,
      ref: 'Packet'
    }
  },
  {
    timestamps: true
  }
);

const Access = mongoose.model('Access', accessSchema);

export default Access;
