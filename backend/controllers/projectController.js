const Project = require('../models/projectModel');
const Inventory = require('../models/inventoryModel');

// Create a new project
exports.createProject = async (req, res) => {
  const { name, startDate, parts } = req.body;

  try {
    const project = new Project({ name, startDate, parts });

    // Update inventory based on the parts used in the project
    for (const part of parts) {
      const inventoryItem = await Inventory.findOne({ sensorOrModuleId: part.sensorOrModuleId });
      if (inventoryItem) {
        inventoryItem.quantity -= part.quantity;
        await inventoryItem.save();
      } else {
        return res.status(400).json({ message: `Part ${part.sensorOrModuleId} not found in inventory` });
      }
    }

    await project.save();
    res.status(201).json({ message: 'Project created successfully', project });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const project = await Project.findByIdAndUpdate(id, updateData, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project updated successfully', project });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
