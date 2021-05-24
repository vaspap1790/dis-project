const dotenv = require('dotenv');
const colors = require('colors');
const { users } = require('../data/users.js');
const { packets } = require('../data/packets.js');
const User = require('../models/userModel.js');
const Packet = require('../models/packetModel.js');
const connectDB = require('../config/db.js');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    //Users
    const createdUsers = await User.insertMany(users);

    const user1 = createdUsers[0];
    const user2 = createdUsers[1];

    //Packets
    const samplePackets = packets.map((packet, index) => {
      if (index < 6) {
        return { ...packet, user: user1._id, ownerRating: user1.rating };
      } else {
        return { ...packet, user: user2._id, ownerRating: user2.rating };
      }
    });

    const createdPackets = await Packet.insertMany(samplePackets);

    console.log('Data imported successfully!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

importData();
