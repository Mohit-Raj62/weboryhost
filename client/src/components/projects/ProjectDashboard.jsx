import React, { useState } from "react";

const mockProjects = [
  { id: 1, name: "Website Redesign", client: "Acme Corp", status: "In Progress", deadline: "2024-07-15", team: ["Alice", "Bob"] },
  { id: 2, name: "Mobile App", client: "Beta Ltd", status: "Done", deadline: "2024-06-01", team: ["Charlie"] },
  { id: 3, name: "SEO Campaign", client: "Gamma Inc", status: "To Do", deadline: "2024-08-10", team: ["Alice", "David"] },
];

const statuses = ["All", "To Do", "In Progress", "Done"];

export default function ProjectDashboard() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredProjects = mockProjects.filter(
    (p) =>
      (statusFilter === "All" || p.status === statusFilter) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ New Project</button>
      </div>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Client</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Deadline</th>
            <th className="p-2 text-left">Team</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr key={project.id} className="border-t hover:bg-gray-50 cursor-pointer">
              <td className="p-2 font-medium">{project.name}</td>
              <td className="p-2">{project.client}</td>
              <td className="p-2">{project.status}</td>
              <td className="p-2">{project.deadline}</td>
              <td className="p-2">{project.team.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 