const Project = require('../models/Project');
const Inventory = require('../models/Inventory');

exports.createProject = async (req, res) => {
  const { name, startDate, parts } = req.body;

  try {
    const newProject = new Project({
      name,
      startDate,
      parts
    });

    for (let part of parts) {
      const item = await Inventory.findOne({ id: part.id });
      if (item && item.number >= part.quantity) {
        item.number -= part.quantity;
        await item.save();
      } else {
        return res.status(400).json({ message: `Insufficient stock for ${item.name}` });
      }
    }

    await newProject.save();
    res.json({ message: 'Project created successfully', project: newProject });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
