import React, { useState } from "react";

export default function UserProfile({ user, editable = false, onEdit }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSave = () => {
    setEditMode(false);
    onEdit && onEdit(form);
  };

  if (!user) return <div>No user data</div>;

  return (
    <div className="p-6 bg-white rounded shadow max-w-lg mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={form.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(form.name || "User")}
          alt="avatar"
          className="w-16 h-16 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-bold">{form.name}</h2>
          <div className="text-gray-600">{form.email}</div>
        </div>
      </div>
      {editMode ? (
        <>
          <div className="mb-2">
            <label className="block mb-1">Phone</label>
            <input name="phone" value={form.phone || ""} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Bio</label>
            <textarea name="bio" value={form.bio || ""} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Skills (comma separated)</label>
            <input name="skills" value={form.skills ? form.skills.join(", ") : ""} onChange={(e) => setForm(f => ({ ...f, skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }))} className="border px-2 py-1 rounded w-full" />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2" onClick={handleSave}>Save</button>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setEditMode(false)}>Cancel</button>
        </>
      ) : (
        <>
          <div className="mb-2">Phone: {form.phone || <span className="text-gray-400">N/A</span>}</div>
          <div className="mb-2">Bio: {form.bio || <span className="text-gray-400">N/A</span>}</div>
          <div className="mb-2">Skills: {form.skills && form.skills.length ? form.skills.join(", ") : <span className="text-gray-400">N/A</span>}</div>
          {editable && <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setEditMode(true)}>Edit Profile</button>}
        </>
      )}
    </div>
  );
} 