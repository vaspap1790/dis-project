const express = require('express');
const { createPacketReview } = require('../controllers/reviewController.js');
const protect = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/:id').post(protect, createPacketReview);

module.exports = router;
