const express = require('express');
const { getDashboardData, getTopSellingVendor } = require('../controllers/dashboardController');
const router = express.Router();

// Dashboard verilerini getiren endpoint
router.get('/dashboard', getDashboardData);

router.get('/top-vendor', getTopSellingVendor);

module.exports = router;
