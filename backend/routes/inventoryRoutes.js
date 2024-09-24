const express = require('express');
const router = express.Router();
const { addInventory, getInventory, updateInventory } = require('../controllers/inventoryController');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/add', authMiddleware, roleCheck(['admin']), addInventory);

router.get('/', authMiddleware, getInventory);

router.put('/update', authMiddleware, roleCheck(['admin']), updateInventory);

module.exports = router;
