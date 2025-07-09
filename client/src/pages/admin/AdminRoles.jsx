import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const AdminRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [permissions, setPermissions] = useState({});
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [newRolePerms, setNewRolePerms] = useState([]);
  const [editRoleName, setEditRoleName] = useState('');
  const [editRoleDesc, setEditRoleDesc] = useState('');
  const [assignUserId, setAssignUserId] = useState('');
  const [assignRoleId, setAssignRoleId] = useState('');
  const [assignLoading, setAssignLoading] = useState(false);

  // Example permissions list (customize as needed)
  const allPermissions = [
    'manage_users', 'manage_roles', 'manage_posts', 'manage_comments', 'manage_settings',
    'moderate_users', 'create_posts', 'edit_own_posts', 'delete_own_posts', 'manage_own_comments',
    'view_posts', 'create_comments', 'edit_own_comments', 'delete_own_comments'
  ];

  // For user dropdown in assign role
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Fetch all users for assign role dropdown
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) return;
        const res = await axios.get(`${API_BASE_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  // Fetch roles from backend
  const fetchRoles = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('No authentication token found. Please login as admin.');
        setRoles([]);
        setLoading(false);
        return;
      }
      const res = await axios.get(`${API_BASE_URL}/api/admin/roles`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('DEBUG: /api/admin/roles response:', res.data);
      if (!Array.isArray(res.data)) {
        if (res.data && typeof res.data === 'object') {
          // Convert object to array
          const arr = Object.entries(res.data).map(([key, value]) => ({ key, ...value }));
          setRoles(arr);
        } else {
          setError('API did not return an array. Response: ' + JSON.stringify(res.data));
          setRoles([]);
        }
      } else {
        setRoles(res.data);
      }
    } catch (err) {
      console.error('DEBUG: Error fetching roles:', err);
      if (err.response) {
        setError('API error: ' + (err.response.data?.error || err.response.statusText || 'Unknown error'));
      } else {
        setError('Network or unknown error: ' + err.message);
      }
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRoles(); }, []);

  // Select role for editing
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setEditRoleName(role.name);
    setEditRoleDesc(role.description || '');
    setPermissions(role.permissions.reduce((acc, perm) => { acc[perm] = true; return acc; }, {}));
  };

  // Add new role
  const handleAddRole = async (e) => {
    e.preventDefault();
    try {
      setError(''); setSuccess('');
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('No authentication token found');
      await axios.post(`${API_BASE_URL}/api/admin/roles`, {
        name: newRoleName,
        description: newRoleDesc,
        permissions: newRolePerms
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Role created successfully!');
      setNewRoleName(''); setNewRoleDesc(''); setNewRolePerms([]);
      fetchRoles();
    } catch (err) {
      setError('Failed to create role.');
    }
  };

  // Update role
  const handleSaveRole = async () => {
    try {
      setError(''); setSuccess('');
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('No authentication token found');
      await axios.put(`${API_BASE_URL}/api/admin/roles/${selectedRole.key || selectedRole._id || selectedRole.id}`, {
        name: editRoleName,
        description: editRoleDesc,
        permissions: Object.entries(permissions).filter(([ , value]) => value).map(([key]) => key)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Role updated successfully!');
      fetchRoles();
    } catch (err) {
      console.error('DEBUG: Error updating role:', err, err.response?.data);
      setError('Failed to update role.' + (err.response?.data?.error ? ' ' + err.response.data.error : ''));
    }
  };

  // Delete role
  const handleDeleteRole = async (roleId) => {
    if (!window.confirm('Delete this role?')) return;
    try {
      setError(''); setSuccess('');
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('No authentication token found');
      await axios.delete(`${API_BASE_URL}/api/admin/roles/${roleId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Role deleted successfully!');
      setSelectedRole(null);
      fetchRoles();
    } catch (err) {
      setError('Failed to delete role.');
    }
  };

  // Assign role to user
  const handleAssignRole = async (e) => {
    e.preventDefault();
    try {
      setAssignLoading(true); setError(''); setSuccess('');
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('No authentication token found');
      const url = `${API_BASE_URL}/api/admin/users/${assignUserId}/role`;
      const payload = { role: assignRoleId };
      console.log('DEBUG: Assign role request:', { url, payload, userId: assignUserId, roleId: assignRoleId });
      await axios.put(`${API_BASE_URL}/api/admin/users/${assignUserId}/role`, {
        role: assignRoleId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Role assigned to user!');
      setAssignUserId(''); setAssignRoleId('');
    } catch (err) {
      console.error('DEBUG: Error assigning role:', err, err.response?.data);
      if (err.response) {
        setError(`Failed to assign role: ${err.response.status} - ${err.response.data?.error || err.response.statusText}`);
      } else {
        setError(`Failed to assign role: ${err.message}`);
      }
    } finally {
      setAssignLoading(false);
    }
  };

  // Permission checkbox for add/edit
  const permCheckbox = (perm, checked, onChange) => (
    <label key={perm} className="flex items-center mr-2 mb-1">
      <input type="checkbox" checked={checked} onChange={onChange}
        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
      <span className="ml-2 text-xs text-gray-700">{perm}</span>
    </label>
  );

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p className="mt-2 text-gray-600">Loading roles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="mt-1 text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Role Management</h2>
      {error && <div className="bg-red-50 border border-red-200 rounded-md p-2 mb-2 text-red-700"><b>ERROR:</b> {error}</div>}
      {success && <div className="bg-green-50 border border-green-200 rounded-md p-2 mb-2 text-green-700">{success}</div>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Role List */}
        <div className="bg-white shadow-md rounded-lg p-6 col-span-1">
          <h3 className="text-lg font-semibold mb-4">Available Roles</h3>
          <div className="space-y-3">
            {!Array.isArray(roles) && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2 mb-2 text-yellow-700">
                <b>DEBUG:</b> roles is not an array. Value: {JSON.stringify(roles)}
              </div>
            )}
            {Array.isArray(roles) && roles.length === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2 mb-2 text-yellow-700">
                <b>DEBUG:</b> No roles found. (roles array is empty)
              </div>
            )}
            {Array.isArray(roles) && roles.map((role) => (
              <div
                key={role.key || role._id || role.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedRole && (selectedRole._id || selectedRole.id) === (role._id || role.id)
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleRoleSelect(role)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">{role.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{role.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {(role.permissions || []).map((permission) => (
                        <span
                          key={permission}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    className="ml-2 text-red-600 hover:text-red-800 text-xs"
                    onClick={e => { e.stopPropagation(); handleDeleteRole(role._id || role.id); }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Add Role */}
        <div className="bg-white shadow-md rounded-lg p-6 col-span-1">
          <h3 className="text-lg font-semibold mb-4">Add New Role</h3>
          <form onSubmit={handleAddRole}>
            <input
              type="text"
              className="w-full border rounded p-2 mb-2"
              placeholder="Role Name"
              value={newRoleName}
              onChange={e => setNewRoleName(e.target.value)}
              required
            />
            <input
              type="text"
              className="w-full border rounded p-2 mb-2"
              placeholder="Description"
              value={newRoleDesc}
              onChange={e => setNewRoleDesc(e.target.value)}
            />
            <div className="mb-2 flex flex-wrap">
              {allPermissions.map(perm => permCheckbox(
                perm,
                newRolePerms.includes(perm),
                () => setNewRolePerms(prev => prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm])
              ))}
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Add Role</button>
          </form>
        </div>
        {/* Edit Role */}
        <div className="bg-white shadow-md rounded-lg p-6 col-span-1">
          {selectedRole ? (
            <>
              <h3 className="text-lg font-semibold mb-4">Edit Role</h3>
              <input
                type="text"
                className="w-full border rounded p-2 mb-2"
                placeholder="Role Name"
                value={editRoleName}
                onChange={e => setEditRoleName(e.target.value)}
              />
              <input
                type="text"
                className="w-full border rounded p-2 mb-2"
                placeholder="Description"
                value={editRoleDesc}
                onChange={e => setEditRoleDesc(e.target.value)}
              />
              <div className="mb-2 flex flex-wrap">
                {allPermissions.map(perm => permCheckbox(
                  perm,
                  permissions[perm] || false,
                  () => setPermissions(prev => ({ ...prev, [perm]: !prev[perm] }))
                ))}
              </div>
              <button onClick={handleSaveRole} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mr-2">Save Changes</button>
              <button onClick={() => setSelectedRole(null)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
            </>
          ) : (
            <div className="text-gray-500">Select a role to edit</div>
          )}
        </div>
      </div>
      {/* Assign Role to User */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6 max-w-lg">
        <h3 className="text-lg font-semibold mb-4">Assign Role to User</h3>
        <form onSubmit={handleAssignRole} className="flex flex-col sm:flex-row gap-2 items-center">
          <select
            className="border rounded p-2 flex-1"
            value={assignUserId}
            onChange={e => setAssignUserId(e.target.value)}
            required
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user._id || user.id} value={user._id || user.id}>
                {user.name || (user.firstName + ' ' + user.lastName) || 'Unknown'}
                {user.email ? ` (${user.email})` : ''} — {user._id || user.id}
              </option>
            ))}
          </select>
          <select
            className="border rounded p-2 flex-1"
            value={assignRoleId}
            onChange={e => setAssignRoleId(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            {Array.isArray(roles) && roles.map(role => (
              <option key={role.key || role._id || role.id} value={role.key || role._id || role.id}>{role.name}</option>
            ))}
          </select>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700" disabled={assignLoading}>{assignLoading ? 'Assigning...' : 'Assign'}</button>
        </form>
      </div>
    </div>
  );
};

export default AdminRoles; 