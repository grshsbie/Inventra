'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function EditInventoryItem() {
  const [sensorOrModuleId, setSensorOrModuleId] = useState(0);  // Numeric ID
  const [sensorModule, setSensorModule] = useState('');         // Sensor/Module Name
  const [registrationDate, setRegistrationDate] = useState(''); // Registration Date
  const [price, setPrice] = useState('');                       // Optional price
  const [quantity, setQuantity] = useState(0);                  // Quantity
  const router = useRouter();
  const { id } = useParams();  // Get item ID from URL

  // Fetch the inventory item details when the component loads
  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(`/api/inventory/${id}`);
      const data = await response.json();
      setSensorOrModuleId(data.sensorOrModuleId);
      setSensorModule(data.sensorModule);
      setRegistrationDate(data.registrationDate.split('T')[0]); // Extract only the date part
      setPrice(data.price);
      setQuantity(data.quantity);
    };

    fetchItem();
  }, [id]);

  const handleUpdateInventory = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/api/inventory/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sensorOrModuleId,
        sensorModule,
        registrationDate,
        price,
        quantity,
      }),
    });

    if (response.ok) {
      alert('Item updated successfully!');
      router.push('/inventory');  // Redirect back to inventory list
    } else {
      alert('Failed to update item');
    }
  };

  return (
    <div>
      <h1>Edit Inventory Item</h1>
      <form onSubmit={handleUpdateInventory}>
        <label>Sensor/Module ID (Numeric):</label>
        <input
          type="number"
          value={sensorOrModuleId}
          onChange={(e) => setSensorOrModuleId(Number(e.target.value))}
          required
          disabled
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

        <button type="submit">Update Item</button>
      </form>
    </div>
  );
}
