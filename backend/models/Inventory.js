const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Inventory', InventorySchema);
