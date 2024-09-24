'use client';

import { useState, useEffect } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [sensorId, setSensorId] = useState('');
  const [quantity, setQuantity] = useState(0);

  // Fetch all projects when the component loads
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  // Handle creating a new project
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: projectName,
        parts: [{ sensorOrModuleId: sensorId, quantity }],
      }),
    });

    if (response.ok) {
      const newProject = await response.json();
      setProjects([...projects, newProject]); // Add new project to the list
      alert('Project created successfully!');
    } else {
      alert('Failed to create project');
    }
  };

  // Handle deleting a project
  const handleDeleteProject = async (id: string) => {
    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setProjects(projects.filter((project) => project.id !== id)); // Remove deleted project
      alert('Project deleted successfully!');
    } else {
      alert('Failed to delete project');
    }
  };

  return (
    <div>
      <h1>Projects</h1>

      {/* Form to create a new project */}
      <form onSubmit={handleCreateProject}>
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
        <button type="submit">Create Project</button>
      </form>

      {/* List all projects */}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <strong>{project.name}</strong>
            <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
            <a href={`/projects/${project.id}/edit`}>Edit</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
