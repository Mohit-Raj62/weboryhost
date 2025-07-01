import React, { useState } from "react";

const roles = ["admin", "manager", "staff", "client"];

export default function UserForm({ initial = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: initial.name || "",
    email: initial.email || "",
    password: "",
    role: initial.role || "staff",
    isActive: initial.isActive ?? true,
    permissions: (initial.permissions || []).join(", "),
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      permissions: form.permissions.split(",").map((p) => p.trim()).filter(Boolean),
    });
  };

  return (
    <form className="p-6 bg-white rounded shadow max-w-md mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">{initial.id ? "Edit User" : "Add User"}</h2>
      <div className="mb-2">
        <label className="block mb-1">Name</label>
        <input name="name" value={form.name} onChange={handleChange} className="border px-2 py-1 rounded w-full" required />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} className="border px-2 py-1 rounded w-full" required />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Password</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} className="border px-2 py-1 rounded w-full" required={!initial.id} />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Role</label>
        <select name="role" value={form.role} onChange={handleChange} className="border px-2 py-1 rounded w-full">
          {roles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="block mb-1">Active</label>
        <input name="isActive" type="checkbox" checked={form.isActive} onChange={handleChange} />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Permissions (comma separated)</label>
        <input name="permissions" value={form.permissions} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
} 