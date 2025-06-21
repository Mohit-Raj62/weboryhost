import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [permissions, setPermissions] = useState({});

  const validRoles = {
    admin: {
      name: 'Administrator',
      description: 'Full access to all features and settings',
      permissions: [
        'manage_users',
        'manage_roles',
        'manage_posts',
        'manage_comments',
        'manage_settings'
      ]
    },
    moderator: {
      name: 'Moderator',
      description: 'Can manage content and moderate users',
      permissions: [
        'manage_posts',
        'manage_comments',
        'moderate_users'
      ]
    },
    author: {
      name: 'Author',
      description: 'Can create and manage their own content',
      permissions: [
        'create_posts',
        'edit_own_posts',
        'delete_own_posts',
        'manage_own_comments'
      ]
    },
    user: {
      name: 'User',
      description: 'Basic user access',
      permissions: [
        'view_posts',
        'create_comments',
        'edit_own_comments',
        'delete_own_comments'
      ]
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('http://localhost:5002/api/admin/roles', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data) {
          setRoles(response.data);
        }
      } catch (err) {
        console.error('Roles fetch error:', err);
        if (err.response?.status === 401) {
          setError('Please log in to access role management');
        } else {
          setError('Failed to fetch roles. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setPermissions(validRoles[role].permissions.reduce((acc, perm) => {
      acc[perm] = true;
      return acc;
    }, {}));
  };

  const handlePermissionChange = (permission) => {
    setPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission]
    }));
  };

  const handleSaveRole = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      await axios.put(
        `http://localhost:5002/api/admin/roles/${selectedRole}`,
        { permissions: Object.entries(permissions).filter(([_, value]) => value).map(([key]) => key) },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Refresh roles after update
      const response = await axios.get('http://localhost:5002/api/admin/roles', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data) {
        setRoles(response.data);
      }
    } catch (err) {
      console.error('Role update error:', err);
      setError('Failed to update role permissions. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Loading roles...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-red-600">{error}</h2>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Role Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Role List */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Roles</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {Object.entries(validRoles).map(([key, role]) => (
                  <li key={key}>
                    <button
                      onClick={() => handleRoleSelect(key)}
                      className={`w-full text-left px-4 py-2 rounded-md ${
                        selectedRole === key
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">{role.name}</div>
                      <div className="text-sm text-gray-500">{role.description}</div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div className="lg:col-span-2">
          {selectedRole ? (
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  {validRoles[selectedRole].name} Permissions
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {validRoles[selectedRole].permissions.map((permission) => (
                    <div key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        id={permission}
                        checked={permissions[permission] || false}
                        onChange={() => handlePermissionChange(permission)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={permission}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {permission.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleSaveRole}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
              Select a role to manage its permissions
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRoles; 