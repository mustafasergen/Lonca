const express = require('express');
const {
  getAllSuppliersMonthlySales,
  getMonthlySalesByVendor,
  getVendorProductSales 
} = require('../controllers/allSuppliersSalesController');
const router = express.Router();

// Toplu satış verisi (Bütün tedarikçiler için)
router.get('/sales/monthly-sales', getAllSuppliersMonthlySales);

// Belirli bir tedarikçinin aylık satış verisi
router.get('/sales/monthly-sales/:vendorId', getMonthlySalesByVendor);

// Belirli bir tedarikçinin ürün satış verisi
router.get('/sales/vendor-product-sales/:vendorId', getVendorProductSales);

module.exports = router;
