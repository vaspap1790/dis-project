import express from 'express';
import { addNewAccess } from '../controllers/accessController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addNewAccess);

export default router;
