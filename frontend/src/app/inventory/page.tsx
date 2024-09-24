'use client';

import { useState, useEffect } from 'react';

export default function Inventory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch('/api/inventory');
      const data = await response.json();
      setItems(data);
    };

    fetchInventory();
  }, []);

  return (
    <div>
      <h1>Inventory</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
