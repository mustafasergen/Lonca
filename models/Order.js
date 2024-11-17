const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cart_item: [
    {
      product: mongoose.Schema.Types.ObjectId,
      item_count: Number,
      quantity: Number,
      cogs: Number,
    },
  ],
  payment_at: Date,
});

module.exports = mongoose.model('Order', orderSchema);