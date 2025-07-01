import React, { useState } from "react";

const mockUsers = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "admin", isActive: true },
  { id: 2, name: "Bob", email: "bob@example.com", role: "manager", isActive: true },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "staff", isActive: false },
];

export default function UserList({ onEdit, onView, onDelete, onAdd }) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Users</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={onAdd}>+ Add User</button>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">{user.isActive ? "Active" : "Inactive"}</td>
              <td className="p-2 flex gap-2">
                <button className="text-blue-600" onClick={() => onView(user)}>View</button>
                <button className="text-green-600" onClick={() => onEdit(user)}>Edit</button>
                <button className="text-red-600" onClick={() => onDelete(user)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 