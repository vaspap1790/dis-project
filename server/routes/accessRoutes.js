const express = require('express');
const { getAccessesByUserId } = require('../controllers/accessController.js');
const protect = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/user/:id').get(protect, getAccessesByUserId);

module.exports = router;
