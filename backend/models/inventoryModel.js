const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  sensorOrModuleId: {
    type: Number, // Numeric ID
    required: true,
    unique: true,
  },
  sensorModule: { // New field for sensor/module name
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