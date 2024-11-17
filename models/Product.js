const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
});

module.exports = mongoose.model('Product', productSchema);