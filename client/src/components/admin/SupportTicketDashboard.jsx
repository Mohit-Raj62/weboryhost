import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const SupportTicketDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    search: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    hasNext: false,
    hasPrev: false
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchTickets();
    fetchStats();
  }, [filters, pagination.page, dateRange]);

  // Add keyboard shortcut for refresh (Ctrl+R)
  useEffect(() => {
    const handleKeyPress = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault();
        handleRefresh();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const fetchTickets = async () => {
    try {
      setError('');
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams({
        page: pagination.page,
        limit: 10,
        ...filters,
        from: dateRange.from,
        to: dateRange.to
      });
      const url = `${API_BASE_URL}/api/support-tickets/admin/all?${params}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTickets(response.data.tickets || []);
      setPagination({
        page: response.data.page || 1,
        totalPages: response.data.totalPages || 1,
        hasNext: response.data.hasNext || false,
        hasPrev: response.data.hasPrev || false
      });
    } catch (err) {
      setError(`Failed to fetch tickets: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const url = `${API_BASE_URL}/api/support-tickets/admin/stats`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (err) {
      // Optionally show error
    }
  };

  const updateTicketStatus = async (ticketId, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`${API_BASE_URL}/api/support-tickets/admin/${ticketId}/status`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTickets();
      fetchStats();
    } catch (err) {
      setError('Failed to update ticket status');
    }
  };

  const addResponse = async (ticket) => {
    if (!responseMessage.trim()) return;
    try {
      const token = localStorage.getItem('adminToken');
      const fullMessage = `Re: Ticket #${ticket.ticketNumber || 'N/A'} - "${ticket.subject}"
Created on: ${formatDate(ticket.createdAt)}

${responseMessage}`;

      await axios.post(`${API_BASE_URL}/api/support-tickets/admin/${ticket._id}/response`,
        { message: fullMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResponseMessage('');
      fetchTickets();
      setSelectedTicket(null); // Close modal after response
    } catch (err) {
      setError('Failed to add response');
    }
  };

  const deleteTicket = async (ticketId) => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_BASE_URL}/api/support-tickets/admin/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTickets();
      fetchStats();
    } catch (err) {
      setError('Failed to delete ticket');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setLoading(true);
    setError('');
    setRefreshMessage('');
    Promise.all([fetchTickets(), fetchStats()]).then(() => {
      setRefreshMessage('Data refreshed successfully!');
      setTimeout(() => setRefreshMessage(''), 3000);
    }).finally(() => {
      setRefreshing(false);
    });
  };

  // Sidebar/modal filter toggle
  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // --- UI ---
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="text-center">
          <div className="h-12 w-12 text-red-500 mx-auto mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Support Tickets</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setError('');
              fetchTickets();
              fetchStats();
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-2 md:px-6 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-extrabold text-indigo-900 mb-1 flex items-center gap-2">
            <span>🎫</span> Support Ticket Dashboard
          </h1>
        </div>
        <div className="flex gap-2 items-center justify-end">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-xl font-bold shadow hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            <span>🔄</span> {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow hover:bg-indigo-700 transition"
          >
            <span>🎛️</span> Filters
          </button>
        </div>
      </div>

      {/* Success Message */}
      {refreshMessage && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-800">{refreshMessage}</span>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="flex flex-col justify-between bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Tickets</p>
              <p className="text-3xl font-extrabold text-gray-900 mt-1">{stats.totalTickets || 0}</p>
            </div>
            <div className="h-12 w-12 bg-blue-200 rounded-lg flex items-center justify-center">
              <span className="text-3xl">🎫</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between bg-gradient-to-br from-red-100 to-red-50 rounded-2xl shadow p-6 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Open Tickets</p>
              <p className="text-3xl font-extrabold text-red-600 mt-1">{stats.openTickets || 0}</p>
            </div>
            <div className="h-12 w-12 bg-red-200 rounded-lg flex items-center justify-center">
              <span className="text-3xl">🛑</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-2xl shadow p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">In Progress</p>
              <p className="text-3xl font-extrabold text-yellow-600 mt-1">{stats.inProgressTickets || 0}</p>
            </div>
            <div className="h-12 w-12 bg-yellow-200 rounded-lg flex items-center justify-center">
              <span className="text-3xl">⏳</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between bg-gradient-to-br from-green-100 to-green-50 rounded-2xl shadow p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Resolved</p>
              <p className="text-3xl font-extrabold text-green-600 mt-1">{stats.resolvedTickets || 0}</p>
            </div>
            <div className="h-12 w-12 bg-green-200 rounded-lg flex items-center justify-center">
              <span className="text-3xl">✅</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Sidebar (desktop) or Modal (mobile) */}
      {(showFilters || window.innerWidth >= 768) && (
        <div className={`fixed md:static inset-0 md:inset-auto z-40 ${showFilters ? 'bg-black bg-opacity-60 flex items-center justify-center p-4 md:p-0' : ''}`}>
          <div className={`bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-3xl shadow-2xl border border-indigo-200 p-6 md:p-8 w-full max-w-2xl mx-auto max-h-[90vh] md:max-h-none overflow-y-auto ${showFilters ? 'animate-in slide-in-from-bottom-4 duration-300' : 'md:block hidden'}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6 md:mb-8 sticky top-0 bg-gradient-to-br from-white via-blue-50 to-indigo-50 pt-2 pb-4 z-10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-xl md:text-2xl">🎛️</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">Filters & Actions</h3>
                  <p className="text-gray-600 text-xs md:text-sm">Customize your ticket view</p>
                </div>
              </div>
              {showFilters && (
                <button 
                  onClick={() => setShowFilters(false)} 
                  className="h-12 w-12 md:h-10 md:w-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              {/* Status Filter */}
              <div className="space-y-2 md:space-y-3">
                <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                  <div className="h-6 w-6 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm">📋</span>
                  </div>
                  Status Filter
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-4 py-4 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium bg-white shadow-sm transition-all duration-200 text-base"
                >
                  <option value="all">All Status</option>
                  <option value="open">🟢 Open</option>
                  <option value="in-progress">🟡 In Progress</option>
                  <option value="resolved">✅ Resolved</option>
                  <option value="closed">⚫ Closed</option>
                </select>
              </div>

              {/* Priority Filter */}
              <div className="space-y-2 md:space-y-3">
                <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                  <div className="h-6 w-6 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm">⚡</span>
                  </div>
                  Priority Filter
                </label>
                <select
                  value={filters.priority}
                  onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full px-4 py-4 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium bg-white shadow-sm transition-all duration-200 text-base"
                >
                  <option value="all">All Priority</option>
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>

              {/* Search Filter */}
              <div className="space-y-2 md:space-y-3 md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                  <div className="h-6 w-6 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm">🔍</span>
                  </div>
                  Search Tickets
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by subject, message, or user..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="w-full px-4 py-4 pl-12 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium bg-white shadow-sm transition-all duration-200 text-base"
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Date Range Filters */}
              <div className="space-y-2 md:space-y-3">
                <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                  <div className="h-6 w-6 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm">📅</span>
                  </div>
                  From Date
                </label>
                <input
                  type="date"
                  name="from"
                  value={dateRange.from}
                  onChange={handleDateChange}
                  className="w-full px-4 py-4 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium bg-white shadow-sm transition-all duration-200 text-base"
                />
              </div>

              <div className="space-y-2 md:space-y-3">
                <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                  <div className="h-6 w-6 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm">📅</span>
                  </div>
                  To Date
                </label>
                <input
                  type="date"
                  name="to"
                  value={dateRange.to}
                  onChange={handleDateChange}
                  className="w-full px-4 py-4 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium bg-white shadow-sm transition-all duration-200 text-base"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 md:flex-row md:gap-4 sticky bottom-0 bg-gradient-to-br from-white via-blue-50 to-indigo-50 pt-4 pb-2">
              <button
                onClick={() => { setPagination(prev => ({ ...prev, page: 1 })); setShowFilters(false); }}
                className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 md:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-base"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Apply Filters
              </button>
              <button
                onClick={() => { 
                  setFilters({ status: 'all', priority: 'all', search: '' }); 
                  setDateRange({ from: '', to: '' }); 
                  setPagination({ ...pagination, page: 1 }); 
                  setShowFilters(false); 
                }}
                className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-4 md:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-base"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear All
              </button>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 md:mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span>📊</span> Current Filters Summary
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-xs">
                <div>
                  <span className="font-semibold text-gray-600">Status:</span>
                  <span className="ml-2 text-gray-900">{filters.status === 'all' ? 'All' : filters.status}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Priority:</span>
                  <span className="ml-2 text-gray-900">{filters.priority === 'all' ? 'All' : filters.priority}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Search:</span>
                  <span className="ml-2 text-gray-900">{filters.search || 'None'}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Date Range:</span>
                  <span className="ml-2 text-gray-900">
                    {dateRange.from && dateRange.to ? `${dateRange.from} to ${dateRange.to}` : 'All dates'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tickets List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="px-6 py-5 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-2">
          <h3 className="text-xl font-bold text-gray-900">Support Tickets</h3>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center px-4 py-2 text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {refreshing ? (
              <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        {tickets.length === 0 ? (
          <div className="p-12 text-center">
            <div className="h-16 w-16 text-gray-400 mx-auto mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Support Tickets Found</h3>
            <p className="text-gray-600 mb-4">There are currently no support tickets in the system.</p>
            <div className="text-sm text-gray-500">
              <p>Support tickets will appear here when users submit them through:</p>
              <ul className="mt-2 space-y-1">
                <li>• Contact form on the website</li>
                <li>• Support ticket form</li>
                <li>• Direct API submissions</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-base">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider">Ticket</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider">Issue Type</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tickets.map((ticket) => (
                    <tr key={ticket._id} className="hover:bg-indigo-50 transition">
                      <td className="px-6 py-4 whitespace-normal max-w-xs">
                        <div className="text-base font-bold text-gray-900">{ticket.subject}</div>
                        <div className="text-xs text-gray-500 truncate">{ticket.message}</div>
                        {ticket.ticketNumber && (
                          <div className="text-xs text-gray-400">#{ticket.ticketNumber}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base text-gray-900">{ticket.userName || ticket.user?.name || 'Unknown'}</div>
                        <div className="text-xs text-gray-500">{ticket.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base text-gray-900">{ticket.issueType || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>{ticket.status}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">{formatDate(ticket.createdAt)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-medium">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => setSelectedTicket(ticket)}
                            className="text-indigo-600 hover:text-indigo-900 font-bold"
                          >
                            View
                          </button>
                          <button
                            onClick={() => { setSelectedTicket(ticket); setResponseMessage(''); }}
                            className="text-green-600 hover:text-green-900 font-bold"
                          >
                            Quick Reply
                          </button>
                          <select
                            value={ticket.status}
                            onChange={(e) => updateTicketStatus(ticket._id, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="open">Open</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                          </select>
                          <button
                            onClick={() => deleteTicket(ticket._id)}
                            className="text-red-600 hover:text-red-900 font-bold"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile Card List */}
            <div className="md:hidden flex flex-col gap-6 p-2">
              {tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className={`relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-2xl shadow-xl p-5 flex flex-col gap-2 border border-gray-200 transition hover:shadow-2xl duration-200 overflow-hidden`}
                >
                  {/* Colored status bar at top */}
                  <div className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl ${
                    ticket.status === 'open' ? 'bg-red-400' :
                    ticket.status === 'in-progress' ? 'bg-yellow-400' :
                    ticket.status === 'resolved' ? 'bg-green-400' :
                    'bg-gray-300'
                  }`} />
                  <div className="flex items-center justify-between mb-2 mt-1">
                    <div className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
                      <span className="inline-block">
                        {ticket.status === 'open' && <span title="Open">🔴</span>}
                        {ticket.status === 'in-progress' && <span title="In Progress">🟡</span>}
                        {ticket.status === 'resolved' && <span title="Resolved">🟢</span>}
                        {ticket.status === 'closed' && <span title="Closed">⚪</span>}
                      </span>
                      {ticket.subject}
                    </div>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full shadow-sm ${getStatusColor(ticket.status)}`}>{
                      ticket.status === 'open' ? 'Open' :
                      ticket.status === 'in-progress' ? 'In Progress' :
                      ticket.status === 'resolved' ? 'Resolved' :
                      'Closed'
                    }</span>
                  </div>
                  <div className="text-xs text-gray-500 truncate mb-1 font-medium">{ticket.message}</div>
                  <div className="flex flex-wrap gap-2 items-center text-xs font-medium mb-1">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full font-semibold ${getPriorityColor(ticket.priority)}`}>{
                      ticket.priority === 'high' ? <><span>🔥</span> High</> :
                      ticket.priority === 'medium' ? <><span>⚡</span> Medium</> :
                      ticket.priority === 'low' ? <><span>🟢</span> Low</> :
                      ticket.priority
                    }</span>
                    {ticket.ticketNumber && <span className="text-gray-400">#{ticket.ticketNumber}</span>}
                    <span className="text-gray-500">{formatDate(ticket.createdAt)}</span>
                    <span className="text-gray-700">{ticket.userName || ticket.user?.name || 'Unknown'}</span>
                  </div>
                  <div className="border-t border-gray-200 my-2" />
                  <div className="flex flex-col gap-3 mt-1">
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-lg py-2 font-bold text-base hover:bg-indigo-700 shadow transition"
                    >
                      <span>🔍</span> View Details
                    </button>
                    <button
                      onClick={() => { setSelectedTicket(ticket); setResponseMessage(''); }}
                      className="w-full flex items-center justify-center gap-2 bg-green-600 text-white rounded-lg py-2 font-bold text-base hover:bg-green-700 shadow transition"
                    >
                      <span>💬</span> Quick Reply
                    </button>
                    <select
                      value={ticket.status}
                      onChange={(e) => updateTicketStatus(ticket._id, e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded px-2 py-2 focus:ring-2 focus:ring-indigo-400 font-semibold"
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                    <button
                      onClick={() => deleteTicket(ticket._id)}
                      className="w-full flex items-center justify-center gap-2 bg-red-600 text-white rounded-lg py-2 font-bold text-base hover:bg-red-700 shadow transition"
                    >
                      <span>🗑️</span> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      <div className="px-6 py-6 border-t border-gray-200 flex items-center justify-between">
        <div className="text-base text-gray-700">
          Page {pagination.page} of {pagination.totalPages}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            disabled={!pagination.hasPrev}
            className="px-4 py-2 text-base border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <button
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            disabled={!pagination.hasNext}
            className="px-4 py-2 text-base border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-indigo-900 flex items-center gap-2"><span>🎫</span> Ticket Details</h3>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-1">{selectedTicket.subject}</h4>
                <p className="text-base text-gray-600 mt-1">{selectedTicket.message}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-base">
                <div>
                  <span className="font-semibold">User:</span> {selectedTicket.userName || selectedTicket.user?.name || 'Unknown'}
                </div>
                <div>
                  <span className="font-semibold">Email:</span> {selectedTicket.email}
                </div>
                <div>
                  <span className="font-semibold">Ticket Number:</span> {selectedTicket.ticketNumber || 'N/A'}
                </div>
                <div>
                  <span className="font-semibold">Issue Type:</span> {selectedTicket.issueType || 'N/A'}
                </div>
                <div>
                  <span className="font-semibold">Status:</span>
                  <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedTicket.status)}`}>
                    {selectedTicket.status}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Priority:</span>
                  <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Created:</span> {formatDate(selectedTicket.createdAt)}
                </div>
              </div>
              {/* Responses Timeline */}
              {selectedTicket.responses && selectedTicket.responses.length > 0 && (
                <div>
                  <h5 className="font-bold text-lg text-gray-900 mb-3">Responses</h5>
                  <ol className="relative border-l-2 border-indigo-200 ml-2">
                    {selectedTicket.responses.map((response, index) => (
                      <li key={index} className="mb-6 ml-4">
                        <div className="absolute w-3 h-3 bg-indigo-400 rounded-full mt-1.5 -left-1.5 border border-white"></div>
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span className="font-semibold">{response.responder?.name || 'Admin'}</span>
                          <span>{formatDate(response.createdAt)}</span>
                        </div>
                        <div className="text-gray-900 text-base bg-indigo-50 rounded p-3 shadow-sm">{response.message}</div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {/* Add Response */}
              <div>
                <h5 className="font-bold text-lg text-gray-900 mb-2">Add Response</h5>
                <textarea
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                  placeholder="Type your response..."
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => addResponse(selectedTicket)}
                  disabled={!responseMessage.trim()}
                  className="mt-3 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-base"
                >
                  Send Response
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTicketDashboard; 