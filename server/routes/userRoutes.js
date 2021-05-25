const express = require('express');
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUserPurchases,
  deleteUser
} = require('../controllers/userController.js');
const protect = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/').post(registerUser).delete(deleteUser);
router.route('/delete/:id').delete(deleteUser);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.get('/purchases/:id', getUserPurchases);

module.exports = router;
