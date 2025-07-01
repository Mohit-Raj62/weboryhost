import React, { useState } from "react";

const statuses = ["To Do", "In Progress", "Blocked", "Done"];
const priorities = ["Low", "Medium", "High"];
const notificationTypes = ["email", "in-app"];

export default function TaskForm({ initial = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: initial.title || "",
    description: initial.description || "",
    assignee: initial.assignee || "",
    status: initial.status || "To Do",
    dueDate: initial.dueDate || "",
    priority: initial.priority || "Medium",
    notifications: initial.notifications || [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({
        ...f,
        notifications: checked
          ? [...f.notifications, value]
          : f.notifications.filter((n) => n !== value),
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(form);
  };

  return (
    <form className="p-6 bg-white rounded shadow max-w-lg mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">{initial.id ? "Edit Task" : "New Task"}</h2>
      <div className="mb-2">
        <label className="block mb-1">Title</label>
        <input name="title" value={form.title} onChange={handleChange} className="border px-2 py-1 rounded w-full" required />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Assignee</label>
        <input name="assignee" value={form.assignee} onChange={handleChange} className="border px-2 py-1 rounded w-full" required />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Status</label>
        <select name="status" value={form.status} onChange={handleChange} className="border px-2 py-1 rounded w-full">
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="block mb-1">Due Date</label>
        <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Priority</label>
        <select name="priority" value={form.priority} onChange={handleChange} className="border px-2 py-1 rounded w-full">
          {priorities.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Notifications</label>
        <div className="flex gap-4">
          {notificationTypes.map((type) => (
            <label key={type} className="flex items-center gap-1">
              <input
                type="checkbox"
                value={type}
                checked={form.notifications.includes(type)}
                onChange={handleChange}
              />
              {type}
            </label>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
} 