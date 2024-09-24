'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function EditProject() {
  const [projectName, setProjectName] = useState('');
  const [sensorId, setSensorId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const router = useRouter();
  const { id } = useParams(); // Get project ID from URL

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch(`/api/projects/${id}`);
      const data = await response.json();
      setProjectName(data.name);
      setSensorId(data.parts[0].sensorOrModuleId);
      setQuantity(data.parts[0].quantity);
    };

    fetchProject();
  }, [id]);

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: projectName,
        parts: [{ sensorOrModuleId: sensorId, quantity }],
      }),
    });

    if (response.ok) {
      alert('Project updated successfully!');
      router.push('/projects'); // Redirect to projects list after update
    } else {
      alert('Failed to update project');
    }
  };

  return (
    <div>
      <h1>Edit Project</h1>
      <form onSubmit={handleUpdateProject}>
        <label>Project Name:</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
        <label>Sensor/Module ID:</label>
        <input
          type="text"
          value={sensorId}
          onChange={(e) => setSensorId(e.target.value)}
          required
        />
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
        <button type="submit">Update Project</button>
      </form>
    </div>
  );
}
