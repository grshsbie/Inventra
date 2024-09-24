const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  parts: [{
    sensorOrModuleId: { type: String, required: true },
    quantity: { type: Number, required: true },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
