import express from 'express';
import {
  addNewAction,
  countUnreadActions,
  getNotifications,
  getRequests,
  updateAction
} from '../controllers/actionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addNewAction);
router.route('/notif/user/:id').get(getNotifications);
router.route('/requests/user/:id').get(getRequests);
router.route('/count/user/:id').get(countUnreadActions);
router.route('/update').put(protect, updateAction);

export default router;
