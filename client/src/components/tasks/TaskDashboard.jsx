import React, { useState, useEffect } from 'react';
import TaskForm from "./TaskForm";

const mockTasks = [
  { id: 1, title: "Design homepage", assignee: "Alice", status: "In Progress", dueDate: "2024-07-10", priority: "High", description: "Design the homepage UI.", notifications: ["email"] },
  { id: 2, title: "Set up repo", assignee: "Bob", status: "To Do", dueDate: "2024-07-12", priority: "Medium", description: "Initialize GitHub repo.", notifications: ["in-app"] },
  { id: 3, title: "Write docs", assignee: "Charlie", status: "Done", dueDate: "2024-06-30", priority: "Low", description: "Write project documentation.", notifications: [] },
];

const statuses = ["All", "To Do", "In Progress", "Blocked", "Done"];

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('list'); // list, kanban
  const [statusFilter, setStatusFilter] = useState("All");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewTask, setViewTask] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTasks(mockTasks);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredTasks = tasks.filter(
    (t) =>
      (statusFilter === "All" || t.status === statusFilter) &&
      (!assigneeFilter || t.assignee.toLowerCase().includes(assigneeFilter.toLowerCase()))
  );

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };
  const handleDelete = (task) => {
    if (window.confirm("Delete this task?")) {
      setTasks((ts) => ts.filter((t) => t.id !== task.id));
    }
  };
  const handleNotify = (task) => {
    alert(`Notification sent for task: ${task.title}`);
  };
  const handleView = (task) => {
    setViewTask(task);
  };
  const handleFormSubmit = (form) => {
    if (editingTask) {
      setTasks((ts) => ts.map((t) => (t.id === editingTask.id ? { ...t, ...form } : t)));
    } else {
      setTasks((ts) => [...ts, { ...form, id: Date.now() }]);
    }
    setShowForm(false);
    setEditingTask(null);
  };
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <div className="flex gap-4 mb-4">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border px-2 py-1 rounded">
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Filter by assignee..."
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>
      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Assignee</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Due Date</th>
            <th className="p-2 text-left">Priority</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id} className="border-t">
              <td className="p-2">{task.title}</td>
              <td className="p-2">{task.assignee}</td>
              <td className="p-2">{task.status}</td>
              <td className="p-2">{task.dueDate}</td>
              <td className="p-2">{task.priority}</td>
              <td className="p-2 flex gap-2">
                <button className="text-blue-600" onClick={() => handleView(task)}>View</button>
                <button className="text-green-600" onClick={() => handleEdit(task)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(task)}>Delete</button>
                <button className="text-yellow-600" onClick={() => handleNotify(task)}>Notify</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => { setShowForm(true); setEditingTask(null); }}>+ New Task</button>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow p-6">
            <TaskForm initial={editingTask || {}} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
          </div>
        </div>
      )}
      {viewTask && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow p-6 max-w-md">
            <h3 className="text-xl font-bold mb-2">{viewTask.title}</h3>
            <div className="mb-2">Assignee: {viewTask.assignee}</div>
            <div className="mb-2">Status: {viewTask.status}</div>
            <div className="mb-2">Due Date: {viewTask.dueDate}</div>
            <div className="mb-2">Priority: {viewTask.priority}</div>
            <div className="mb-2">Description: {viewTask.description}</div>
            <div className="mb-2">Notifications: {viewTask.notifications && viewTask.notifications.length ? viewTask.notifications.join(", ") : "None"}</div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2" onClick={() => setViewTask(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
} 