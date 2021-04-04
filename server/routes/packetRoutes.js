import express from 'express';
import { getPackets, getPacketById } from '../controllers/packetController.js';

const router = express.Router();

router.route('/').get(getPackets);
router.route('/:id').get(getPacketById);

export default router;
