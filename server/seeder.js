const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users.js');
const packets = require('./data/packets.js');
const User = require('./models/userModel.js');
const Packet = require('./models/packetModel.js');
const Review = require('./models/reviewModel.js');
const Access = require('./models/accessModel.js');
const connectDB = require('./config/db.js');

dotenv.config();
connectDB();

const clearData = async () => {
  try {
    await Review.deleteMany();
    await Access.deleteMany();
    await Packet.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed successfully!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await Review.deleteMany();
    await Access.deleteMany();
    await Packet.deleteMany();
    await User.deleteMany();

    //Users
    const createdUsers = await User.insertMany(users);

    const adminId = createdUsers[0]._id;
    const user1Id = createdUsers[1]._id;
    const user2Id = createdUsers[2]._id;

    //Packets
    const samplePackets = packets.map((packet, index) => {
      if (index === 0 || index === 1) {
        return { ...packet, user: adminId };
      }
      if (index === 2 || index === 3) {
        return { ...packet, user: user1Id };
      }
      if (index === 4 || index === 5) {
        return { ...packet, user: user2Id };
      }
    });

    const createdPackets = await Packet.insertMany(samplePackets);

    const packet1 = createdPackets[0]._id;
    const packet2 = createdPackets[1]._id;
    const packet3 = createdPackets[2]._id;
    const packet4 = createdPackets[3]._id;
    const packet5 = createdPackets[4]._id;
    const packet6 = createdPackets[5]._id;

    //Accesses
    await Access.create({ user: adminId, packet: packet3 });
    await Access.create({ user: adminId, packet: packet4 });
    await Access.create({ user: adminId, packet: packet5 });
    await Access.create({ user: adminId, packet: packet6 });

    await Access.create({ user: user1Id, packet: packet4 });
    await Access.create({ user: user1Id, packet: packet5 });

    await Access.create({ user: user2Id, packet: packet2 });
    await Access.create({ user: user2Id, packet: packet3 });

    //Reviews
    await Review.create({
      user: adminId,
      packet: packet3,
      rating: 4,
      comment: 'Very good'
    });
    await Review.create({
      user: adminId,
      packet: packet4,
      rating: 3,
      comment: 'Good'
    });
    await Review.create({
      user: adminId,
      packet: packet5,
      rating: 4,
      comment: 'Very good'
    });
    await Review.create({
      user: adminId,
      packet: packet6,
      rating: 5,
      comment: 'Excellent'
    });

    await Review.create({
      user: user1Id,
      packet: packet4,
      rating: 4,
      comment: 'Very good'
    });
    await Review.create({
      user: user1Id,
      packet: packet5,
      rating: 3,
      comment: 'Good'
    });

    await Review.create({
      user: user2Id,
      packet: packet2,
      rating: 4,
      comment: 'Very good'
    });
    await Review.create({
      user: user2Id,
      packet: packet3,
      rating: 5,
      comment: 'Excellent'
    });

    console.log('Data imported successfully!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

//if run with argument '-d' then clearData (see 'package.json' scripts)
if (process.argv[2] === '-d') {
  clearData();
} else {
  importData();
}
