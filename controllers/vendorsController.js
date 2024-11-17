const Vendor = require('../models/Vendor');  

// Tedarikçi detaylarını getiren fonksiyon
const getVendorById = (req, res) => {
  const { vendorId } = req.params;  // vendorId parametresi

  Vendor.findById(vendorId)
    .then((vendor) => {
      if (!vendor) {
        return res.status(404).json({ message: 'Vendor not found' });
      }
      res.json(vendor); 
    })
    .catch((error) => {
      console.error("Error fetching vendor:", error);
      res.status(500).json({ message: 'Error fetching vendor' });
    });
};

module.exports = { getVendorById };  