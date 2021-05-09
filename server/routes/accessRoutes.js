const express = require('express');
const {
  addNewAccess,
  getAccessesByUserId
} = require('../controllers/accessController.js');
const protect = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/').post(protect, addNewAccess);
router.route('/user/:id').get(protect, getAccessesByUserId);

module.exports = router;
