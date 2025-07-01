import React, { useState } from "react";

const initialContent = [
  { id: 1, title: "Welcome Post", status: "Published", scheduled: null },
  { id: 2, title: "New Feature Update", status: "Draft", scheduled: "2024-07-10" },
];

export default function ContentManager() {
  const [content, setContent] = useState(initialContent);
  const [form, setForm] = useState({ title: "", status: "Draft", scheduled: "" });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setContent((c) => c.map((item) => (item.id === editingId ? { ...item, ...form } : item)));
    } else {
      setContent((c) => [...c, { ...form, id: Date.now() }]);
    }
    setForm({ title: "", status: "Draft", scheduled: "" });
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    setContent((c) => c.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Content Management</h2>
      <form className="mb-6 bg-white rounded shadow p-4" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block mb-1">Title</label>
          <input name="title" value={form.title} onChange={handleChange} className="border px-2 py-1 rounded w-full" required />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="border px-2 py-1 rounded w-full">
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block mb-1">Schedule (optional)</label>
          <input name="scheduled" type="date" value={form.scheduled || ""} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingId ? "Update" : "Add"} Content</button>
      </form>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Scheduled</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {content.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.title}</td>
              <td className="p-2">{item.status}</td>
              <td className="p-2">{item.scheduled || "-"}</td>
              <td className="p-2 flex gap-2">
                <button className="text-green-600" onClick={() => handleEdit(item)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 