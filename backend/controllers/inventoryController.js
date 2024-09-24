const Inventory = require('../models/inventoryModel');

exports.addInventory = async (req, res) => {
  const { sensorOrModuleId, sensorModule, registrationDate, price, quantity } = req.body;

  try {
    const inventoryItem = new Inventory({
      sensorOrModuleId: Number(sensorOrModuleId), // Keep as Number
      sensorModule, // Use the new field
      registrationDate,
      price,
      quantity
    });
    await inventoryItem.save();
    res.status(201).json({ message: 'Inventory item added successfully', inventoryItem });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Get All Inventory Items
exports.getInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Inventory Item
exports.updateInventory = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const item = await Inventory.findByIdAndUpdate(id, updateData, { new: true });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Inventory item updated successfully', item });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete Inventory Item
exports.deleteInventory = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Inventory.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
