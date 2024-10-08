'use client';

import { useState, useEffect } from 'react';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [sensorOrModuleId, setSensorOrModuleId] = useState(0);  // Numeric ID
  const [sensorModule, setSensorModule] = useState('');         // Sensor/Module Name
  const [registrationDate, setRegistrationDate] = useState(''); // Registration Date
  const [price, setPrice] = useState('');                       // Optional price
  const [quantity, setQuantity] = useState(0);                  // Quantity

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch('/api/inventory');
      const data = await response.json();
      setItems(data);
    };

    fetchInventory();
  }, []);

  const handleAddInventory = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sensorOrModuleId,
        sensorModule,
        registrationDate: registrationDate || new Date().toISOString(),  // Set current date if empty
        price,
        quantity,
      }),
    });

    if (response.ok) {
      const newItem = await response.json();
      setItems([...items, newItem]);  // Add new item to the list
      alert('Item added to inventory successfully!');
    } else {
      alert('Failed to add item to inventory');
    }
  };

  return (
    <div>
      <h1>Inventory Management</h1>

      {/* Form to add a new inventory item */}
      <form onSubmit={handleAddInventory}>
        <label>Sensor/Module ID (Numeric):</label>
        <input
          type="number"
          value={sensorOrModuleId}
          onChange={(e) => setSensorOrModuleId(Number(e.target.value))}
          required
        />

        <label>Sensor/Module Name:</label>
        <input
          type="text"
          value={sensorModule}
          onChange={(e) => setSensorModule(e.target.value)}
          required
        />

        <label>Registration Date (optional):</label>
        <input
          type="date"
          value={registrationDate}
          onChange={(e) => setRegistrationDate(e.target.value)}
        />

        <label>Price (optional):</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />

        <button type="submit">Add to Inventory</button>
      </form>

      {/* List all inventory items */}
      <ul>
        {items.map((item) => (
          <li key={item.sensorOrModuleId}>
            <strong>{item.sensorModule}</strong> - Quantity: {item.quantity}
            <button onClick={() => handleDeleteItem(item.sensorOrModuleId)}>Delete</button>
            <a href={`/inventory/${item.sensorOrModuleId}/edit`}>Edit</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
