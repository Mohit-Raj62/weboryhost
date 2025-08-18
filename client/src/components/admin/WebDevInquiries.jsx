import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

// A more robust error handler utility
const getApiErrorMessage = (err) => {
    if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("API Error Response:", err.response.data);
        return `Error ${err.response.status}: ${err.response.data.message || 'Failed to fetch inquiries.'}`;
    }
    if (err.request) {
        // The request was made but no response was received
        console.error("API No Response:", err.request);
        return "Network Error: No response from server. Please check connection and server status.";
    }
    // Something happened in setting up the request that triggered an Error
    console.error("API Request Setup Error:", err.message);
    return `An error occurred: ${err.message}`;
};

const WebDevInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError("Authentication required. Please log in first to view inquiries.");
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      // **IMPORTANT**: Replace with your actual backend endpoint
      const response = await axios.get(`${API_BASE_URL}/api/admin/inquiries`, config);

      // Process the successful response
      if (response.data && response.data.success) {
        setInquiries(response.data.inquiries || response.data.data || response.data.contacts || []);
        setLastUpdated(new Date());
      } else if (response.data && Array.isArray(response.data)) {
        // Handle cases where the API returns a simple array
        setInquiries(response.data);
        setLastUpdated(new Date());
      } else {
        // Handle unexpected response structure
        console.warn('Unexpected API response structure:', response.data);
        setInquiries([]);
        setError("Received data, but it was in an unexpected format.");
      }
      
    } catch (err) {
      const errorMessage = getApiErrorMessage(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // Auto-refresh functionality
  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        fetchInquiries();
      }, 30000); // Refresh every 30 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, fetchInquiries]);

  const handleRefresh = () => {
    fetchInquiries();
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-xl shadow">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading inquiries...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-xl shadow">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <button 
            onClick={handleRefresh}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Web Development Inquiries</h2>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-1">
              Last updated: {lastUpdated.toLocaleString('en-IN')}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAutoRefresh}
            className={`px-3 py-2 text-sm rounded transition-colors ${
              autoRefresh 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {autoRefresh ? '🔄 Auto-refresh ON' : '⏸️ Auto-refresh OFF'}
          </button>
          <button
            onClick={handleRefresh}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            <svg 
              className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="text-center py-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              No Inquiries Found
            </h3>
            <p className="text-blue-700 mb-4">
              There are currently no web development inquiries to display.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 border-b border-gray-300 text-left font-semibold">Name</th>
                <th className="px-4 py-3 border-b border-gray-300 text-left font-semibold">Email</th>
                <th className="px-4 py-3 border-b border-gray-300 text-left font-semibold">Phone</th>
                <th className="px-4 py-3 border-b border-gray-300 text-left font-semibold">Selected Plan</th>
                <th className="px-4 py-3 border-b border-gray-300 text-left font-semibold">Message</th>
                <th className="px-4 py-3 border-b border-gray-300 text-left font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry, index) => (
                <tr key={inquiry._id || index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 border-b border-gray-200">{inquiry.name || '-'}</td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <a 
                      href={`mailto:${inquiry.email}`} 
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {inquiry.email || '-'}
                    </a>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <a 
                      href={`tel:${inquiry.phone}`} 
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {inquiry.phone || '-'}
                    </a>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {inquiry.selectedPlan || 'Not specified'}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 max-w-xs">
                    <div className="truncate" title={inquiry.message}>
                      {inquiry.message || '-'}
                    </div>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-600">
                    {inquiry.createdAt ? 
                      new Date(inquiry.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) 
                      : '-'
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <div>
              Total inquiries: <span className="font-semibold">{inquiries.length}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  error ? 'bg-red-500' : 'bg-green-500'
                }`}></div>
                <span>{error ? 'Connection Error' : 'Connected'}</span>
              </div>
              {autoRefresh && (
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  Auto-refreshing every 30s
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebDevInquiries;