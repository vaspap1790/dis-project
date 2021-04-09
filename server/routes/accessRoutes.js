import express from 'express';
import {
  addNewAccess,
  getAccessesByUserId
} from '../controllers/accessController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addNewAccess);
router.route('/user/:id').get(protect, getAccessesByUserId);

export default router;
