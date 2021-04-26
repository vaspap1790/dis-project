import express from 'express';
import {
  addNewAction,
  countUnreadActions,
  getActions,
  updateAction
} from '../controllers/actionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addNewAction);
router.route('/user/:id').get(getActions);
router.route('/count/user/:id').get(countUnreadActions);
router.route('/update/:id').put(protect, updateAction);

export default router;
