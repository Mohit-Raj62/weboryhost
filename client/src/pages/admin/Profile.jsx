import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { admin, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast({ open: false, message: "", type: "success" });

    // Validate passwords if changing
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setToast({
          open: true,
          message: "New passwords do not match",
          type: "error",
        });
        return;
      }
      if (formData.newPassword.length < 6) {
        setToast({
          open: true,
          message: "Password must be at least 6 characters long",
          type: "error",
        });
        return;
      }
    }

    try {
      await updateProfile({
        name: formData.name,
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      setToast({
        open: true,
        message: "Profile updated successfully",
        type: "success",
      });

      // Clear password fields
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      setToast({
        open: true,
        message: error.response?.data?.message || "Failed to update profile",
        type: "error",
      });
    }
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-2">
      <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-2xl p-10 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-200 flex items-center justify-center text-white text-5xl font-bold mb-3 shadow-lg">
            {admin?.name?.charAt(0)?.toUpperCase()}
          </div>
          {admin?.name && (
            <div className="text-xl font-semibold text-gray-800 mb-1 tracking-tight">{admin.name}</div>
          )}
          <h1 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">Profile Settings</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all text-gray-800 placeholder-gray-400"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all text-gray-800 placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="my-8 border-t border-gray-100" />
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Change Password</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-500 mb-2">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all text-gray-800 placeholder-gray-400"
                placeholder="Current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all text-gray-800 placeholder-gray-400"
                placeholder="New password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all text-gray-800 placeholder-gray-400"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <button
              type="submit"
              className="px-8 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 hover:from-blue-600 hover:to-cyan-500 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>

      {/* Toast Notification */}
      {toast.open && (
        <div
          className={`fixed bottom-6 right-6 z-50 min-w-[250px] max-w-xs px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transition-all duration-300 animate-fade-in-up
            ${toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
        >
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={handleCloseToast}
            className="ml-2 text-white hover:text-gray-200 focus:outline-none"
            aria-label="Close notification"
          >
            &times;
          </button>
        </div>
      )}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </div>
  );
};

export default Profile; 