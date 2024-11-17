const mongoose = require('mongoose');

// Vendor Schema tanımı
const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
});

const Vendor = mongoose.model('Vendor', vendorSchema); 
module.exports = Vendor; 