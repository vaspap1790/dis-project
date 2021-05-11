const express = require('express');
const {
  addNewAction,
  countUnreadActions,
  getNotifications,
  getRequests,
  updateAction,
  storeInfo,
  fetchPurchaseRequest
} = require('../controllers/actionController.js');
const protect = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/').post(protect, addNewAction);
router.route('/notif/user/:id').get(getNotifications);
router.route('/requests/user/:id').get(getRequests);
router.route('/count/user/:id').get(countUnreadActions);
router.route('/purchase/request/:id').get(fetchPurchaseRequest);
router.route('/store/info').post(storeInfo);
router.route('/update').put(protect, updateAction);

module.exports = router;
