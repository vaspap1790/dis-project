import express from 'express';
import {
  getPackets,
  getPacketById,
  getPacketsByUserId,
  updatePacket,
  createPacket,
  getTopPackets
} from '../controllers/packetController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPackets).post(protect, createPacket);
router.route('/top').get(getTopPackets);
router.route('/user/:id').get(getPacketsByUserId);
router.route('/:id').get(getPacketById).put(protect, updatePacket);

export default router;
