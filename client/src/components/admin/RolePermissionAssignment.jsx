import React from "react";

const allRoles = ["admin", "manager", "staff", "client"];
const allPermissions = [
  "manage_users",
  "manage_projects",
  "view_reports",
  "edit_content",
  "delete_content",
  "assign_tasks",
];

export default function RolePermissionAssignment({ role, permissions, onChange }) {
  const handleRoleChange = (e) => {
    onChange({ role: e.target.value, permissions });
  };
  const handlePermissionChange = (perm) => {
    if (permissions.includes(perm)) {
      onChange({ role, permissions: permissions.filter((p) => p !== perm) });
    } else {
      onChange({ role, permissions: [...permissions, perm] });
    }
  };
  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="mb-2">
        <label className="block mb-1 font-bold">Role</label>
        <select value={role} onChange={handleRoleChange} className="border px-2 py-1 rounded">
          {allRoles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-bold">Permissions</label>
        <div className="flex flex-wrap gap-2">
          {allPermissions.map((perm) => (
            <label key={perm} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={permissions.includes(perm)}
                onChange={() => handlePermissionChange(perm)}
              />
              {perm}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
} 