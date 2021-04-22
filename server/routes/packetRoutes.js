import express from 'express';
import {
  getPackets,
  getPacketById,
  getPacketsByUserId,
  updatePacket,
  createPacket,
  getTopPackets,
  getPacketDataById,
  getUserDetails
} from '../controllers/packetController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPackets).post(protect, createPacket);
router.route('/top').get(getTopPackets);
router.route('/user/:id').get(getPacketsByUserId);
router.route('/userDetails/:id').get(getUserDetails);
router.route('/:id').get(getPacketById).put(protect, updatePacket);
router.route('/data/:id').get(getPacketDataById);

export default router;
