import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin' // Default role
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const roles = [
    { value: 'admin', label: 'Administrator' },
    { value: 'moderator', label: 'Moderator' },
    { value: 'editor', label: 'Editor' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5002/api/admin/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Signup failed');
      } else if (err.request) {
        setError('No response from server. Please try again.');
      } else {
        setError('Error setting up request. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="backdrop-blur-md bg-white/70 shadow-2xl rounded-2xl max-w-md w-full p-8 space-y-8 border border-indigo-100">
        <div className="flex flex-col items-center">
          {/* Logo/avatar placeholder */}
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-2 shadow-md">
            <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" /></svg>
          </div>
          <h2 className="text-center text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent tracking-tight">
            Create Admin Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded flex items-center gap-2 animate-shake">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-1.414-1.414A9 9 0 105.636 18.364l1.414 1.414A9 9 0 1018.364 5.636z" /></svg>
              <span>{error}</span>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 bg-white/80"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 bg-white/80"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={loading}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 bg-white/80"
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 bg-white/80 pr-12"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={handleTogglePassword}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3C5 3 1.73 7.11 1.07 7.98a1 1 0 000 1.04C1.73 12.89 5 17 10 17s8.27-4.11 8.93-4.98a1 1 0 000-1.04C18.27 7.11 15 3 10 3zm0 12c-3.87 0-7.16-3.13-7.82-4C2.84 9.13 6.13 6 10 6s7.16 3.13 7.82 4c-.66.87-3.95 4-7.82 4z" /><path d="M10 8a2 2 0 100 4 2 2 0 000-4z" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M4.03 3.97a.75.75 0 10-1.06 1.06l1.1 1.1C2.7 7.11 1.73 8.11 1.07 8.98a1 1 0 000 1.04C1.73 12.89 5 17 10 17c1.61 0 3.09-.37 4.38-1.01l1.59 1.59a.75.75 0 101.06-1.06l-14-14zm7.13 9.25a2 2 0 01-2.35-2.35l2.35 2.35zM10 6c-1.1 0-2.16.23-3.13.64l1.53 1.53A2 2 0 0112 10c0 .34-.07.66-.19.95l1.53 1.53C13.77 12.16 14.9 12 16 12c.66-.87 1.63-1.87 2.29-2.74a1 1 0 000-1.04C18.27 7.11 15 3 10 3c-.34 0-.67.02-1 .05l1.13 1.13C10.84 4.06 10.42 4 10 4z" /></svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 bg-white/80 pr-12"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={handleToggleConfirmPassword}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 focus:outline-none"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3C5 3 1.73 7.11 1.07 7.98a1 1 0 000 1.04C1.73 12.89 5 17 10 17s8.27-4.11 8.93-4.98a1 1 0 000-1.04C18.27 7.11 15 3 10 3zm0 12c-3.87 0-7.16-3.13-7.82-4C2.84 9.13 6.13 6 10 6s7.16 3.13 7.82 4c-.66.87-3.95 4-7.82 4z" /><path d="M10 8a2 2 0 100 4 2 2 0 000-4z" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M4.03 3.97a.75.75 0 10-1.06 1.06l1.1 1.1C2.7 7.11 1.73 8.11 1.07 8.98a1 1 0 000 1.04C1.73 12.89 5 17 10 17c1.61 0 3.09-.37 4.38-1.01l1.59 1.59a.75.75 0 101.06-1.06l-14-14zm7.13 9.25a2 2 0 01-2.35-2.35l2.35 2.35zM10 6c-1.1 0-2.16.23-3.13.64l1.53 1.53A2 2 0 0112 10c0 .34-.07.66-.19.95l1.53 1.53C13.77 12.16 14.9 12 16 12c.66-.87 1.63-1.87 2.29-2.74a1 1 0 000-1.04C18.27 7.11 15 3 10 3c-.34 0-.67.02-1 .05l1.13 1.13C10.84 4.06 10.42 4 10 4z" /></svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-400 hover:from-indigo-600 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && (
                <svg className="animate-spin h-5 w-5 mr-2 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              )}
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup; 