const dotenv = require('dotenv');
const colors = require('colors');
const User = require('../models/userModel.js');
const Packet = require('../models/packetModel.js');
const Review = require('../models/reviewModel.js');
const Action = require('../models/actionModel.js');
const connectDB = require('../config/db.js');

dotenv.config();
connectDB();

const clearData = async () => {
  try {
    await Review.deleteMany();
    await Action.deleteMany();
    await Packet.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed successfully!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

clearData();
