import express from 'express';
import { createPacketReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:id').post(protect, createPacketReview);

export default router;
