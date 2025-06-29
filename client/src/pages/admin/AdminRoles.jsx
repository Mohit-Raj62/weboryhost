import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const AdminRoles = () => {
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

        await axios.get(`${API_BASE_URL}/api/admin/roles`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
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
        `${API_BASE_URL}/api/admin/roles/${selectedRole}`,
        { permissions: Object.entries(permissions).filter(([ , value]) => value).map(([key]) => key) },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      await axios.get(`${API_BASE_URL}/api/admin/roles`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (err) {
      console.error('Role update error:', err);
      setError('Failed to update role permissions. Please try again.');
    }
  };

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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role List */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Available Roles</h3>
          <div className="space-y-3">
            {Object.entries(validRoles).map(([roleKey, roleData]) => (
              <div
                key={roleKey}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedRole === roleKey
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleRoleSelect(roleKey)}
              >
                <h4 className="font-medium text-gray-900">{roleData.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{roleData.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {roleData.permissions.map((permission) => (
                    <span
                      key={permission}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Permission Editor */}
        {selectedRole && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              Edit Permissions: {validRoles[selectedRole].name}
            </h3>
            
            <div className="space-y-3">
              {validRoles[selectedRole].permissions.map((permission) => (
                <label key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={permissions[permission] || false}
                    onChange={() => handlePermissionChange(permission)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{permission}</span>
                </label>
              ))}
            </div>

            <button
              onClick={handleSaveRole}
              className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRoles; 