const express = require('express');
const {
  getPackets,
  getPacketById,
  getPacketsByUserId,
  updatePacket,
  createPacket,
  getTopPackets,
  getUserDetails,
  getPacketKeys,
  deletePacket
} = require('../controllers/packetController.js');
const protect = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/').get(getPackets).post(protect, createPacket);
router.route('/delete/:id').delete(protect, deletePacket);
router.route('/top').get(getTopPackets);
router.route('/user/:id').get(getPacketsByUserId);
router.route('/userDetails/:id').get(getUserDetails);
router.route('/:id').get(getPacketById).put(protect, updatePacket);
router.route('/keys/:id').get(getPacketKeys);

module.exports = router;
