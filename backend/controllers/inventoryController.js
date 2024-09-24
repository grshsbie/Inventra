const Inventory = require('../models/Inventory');

exports.addInventory = async (req, res) => {
  const { id, name, number, registrationDate, price } = req.body;

  try {
    const newInventory = new Inventory({
      id,
      name,
      number,
      registrationDate,
      price
    });

    await newInventory.save();
    res.json({ message: 'Inventory added successfully', item: newInventory });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

exports.updateInventory = async (req, res) => {
  const { id, quantity } = req.body;

  try {
    const item = await Inventory.findOne({ id });
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.number -= quantity;
    await item.save();

    res.json({ message: 'Inventory updated successfully', item });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
