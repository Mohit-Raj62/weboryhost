import React, { useState, useEffect } from "react";

// Mock API functions - replace these with actual API calls
const mockAPI = {
  getUsers: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: "Alice", email: "alice@example.com", role: "admin", isActive: true },
          { id: 2, name: "Bob", email: "bob@example.com", role: "manager", isActive: true },
          { id: 3, name: "Charlie", email: "charlie@example.com", role: "staff", isActive: false },
        ]);
      }, 1000);
    });
  },
  
  addUser: (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: Date.now(),
          ...userData,
          isActive: true
        };
        resolve(newUser);
      }, 500);
    });
  },

  updateUser: (id, userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id, ...userData });
      }, 500);
    });
  },

  deleteUser: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  }
};

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "staff"
  });
  const [editUser, setEditUser] = useState({
    id: null,
    name: "",
    email: "",
    role: "staff",
    isActive: true
  });

  // Fetch users from backend on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userData = await mockAPI.getUsers();
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add User
  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const addedUser = await mockAPI.addUser(newUser);
      setUsers([...users, addedUser]);
      setNewUser({ name: "", email: "", role: "staff" });
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user");
    }
  };

  // View User
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  // Edit User
  const handleEditUser = (user) => {
    setEditUser(user);
    setShowEditForm(true);
  };

  const handleUpdateUser = async () => {
    if (!editUser.name || !editUser.email) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const updatedUser = await mockAPI.updateUser(editUser.id, editUser);
      setUsers(users.map(user => 
        user.id === editUser.id ? updatedUser : user
      ));
      setShowEditForm(false);
      setEditUser({ id: null, name: "", email: "", role: "staff", isActive: true });
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  // Delete User
  const handleDeleteUser = async (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await mockAPI.deleteUser(user.id);
        setUsers(users.filter(u => u.id !== user.id));
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user");
      }
    }
  };

  const handleInputChange = (e, type = 'add') => {
    const { name, value } = e.target;
    if (type === 'add') {
      setNewUser(prev => ({
        ...prev,
        [name]: value
      }));
    } else if (type === 'edit') {
      setEditUser(prev => ({
        ...prev,
        [name]: name === 'isActive' ? e.target.checked : value
      }));
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading users...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Users</h2>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowAddForm(true)}
        >
          + Add User
        </button>
      </div>

      {/* Add User Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">Add New User</h3>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={(e) => handleInputChange(e, 'add')}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={(e) => handleInputChange(e, 'add')}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Role</label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={(e) => handleInputChange(e, 'add')}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="staff">Staff</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddUser}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Form Modal */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">Edit User</h3>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={editUser.name}
                  onChange={(e) => handleInputChange(e, 'edit')}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={editUser.email}
                  onChange={(e) => handleInputChange(e, 'edit')}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Role</label>
                <select
                  name="role"
                  value={editUser.role}
                  onChange={(e) => handleInputChange(e, 'edit')}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="staff">Staff</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={editUser.isActive}
                    onChange={(e) => handleInputChange(e, 'edit')}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium">Active</span>
                </label>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowEditForm(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateUser}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Update User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View User Modal */}
      {showViewModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">User Details</h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium">ID:</span>
                <span className="ml-2">{selectedUser.id}</span>
              </div>
              <div>
                <span className="font-medium">Name:</span>
                <span className="ml-2">{selectedUser.name}</span>
              </div>
              <div>
                <span className="font-medium">Email:</span>
                <span className="ml-2">{selectedUser.email}</span>
              </div>
              <div>
                <span className="font-medium">Role:</span>
                <span className="ml-2 capitalize">{selectedUser.role}</span>
              </div>
              <div>
                <span className="font-medium">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  selectedUser.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {selectedUser.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2 capitalize">{user.role}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="p-2 flex gap-2">
                <button 
                  className="text-blue-600 hover:underline" 
                  onClick={() => handleViewUser(user)}
                >
                  View
                </button>
                <button 
                  className="text-green-600 hover:underline" 
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
                <button 
                  className="text-red-600 hover:underline" 
                  onClick={() => handleDeleteUser(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No users found
        </div>
      )}
    </div>
  );
}