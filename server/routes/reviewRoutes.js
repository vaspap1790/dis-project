const express = require('express');
const { createUserReview } = require('../controllers/reviewController.js');
const protect = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/:id').post(protect, createUserReview);

module.exports = router;
