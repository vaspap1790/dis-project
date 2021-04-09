import express from 'express';
import {
  getPackets,
  getPacketById,
  getPacketsByUserId
} from '../controllers/packetController.js';

const router = express.Router();

router.route('/').get(getPackets);
router.route('/:id').get(getPacketById);
router.route('/user/:id').get(getPacketsByUserId);

export default router;
