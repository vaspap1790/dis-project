const express = require('express');
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUserPurchases
} = require('../controllers/userController.js');
const protect = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.get('/purchases/:id', getUserPurchases);

module.exports = router;
