const express = require('express');
const Vendor = require('../models/Vendor');  // Modelin doğru import edildiğinden emin olun
const router = express.Router();

// Tüm tedarikçileri getiren endpoint
router.get('/vendors', (req, res) => {
  Vendor.find()  // Tüm tedarikçileri sorgula
    .then(vendors => {
      if (vendors.length === 0) {
        return res.status(404).json({ message: 'No vendors found' });
      }
      res.json(vendors);
    })
    .catch((error) => {
      console.error("Error fetching vendors:", error);
      res.status(500).json({ message: 'Error fetching vendors' });
    });
});

module.exports = router;