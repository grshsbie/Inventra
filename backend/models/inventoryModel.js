const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  sensorOrModuleId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
