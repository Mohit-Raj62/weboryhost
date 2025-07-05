import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../config/api';
import ProjectDashboard from '../../components/projects/ProjectDashboard';
import TaskDashboard from '../../components/tasks/TaskDashboard';
import InvoiceDashboard from '../../components/billing/InvoiceDashboard';
import AnalyticsDashboard from '../../components/analytics/AnalyticsDashboard';
import ContentManager from '../../components/content/ContentManager';
import SettingsDashboard from '../../components/settings/SettingsDashboard';
import UserList from '../../components/admin/UserList';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalComments: 0,
    totalContacts: 0,
    totalTickets: 0,
    activeUsers: 0,
    newUsers24h: 0,
    newPosts24h: 0,
    newComments24h: 0,
    newContacts24h: 0,
    newTickets24h: 0,
    roleStats: {
      admin: 0,
      moderator: 0,
      author: 0,
      user: 0
    },
    userGrowth: [],
    topPosts: [],
    systemHealth: {
      status: 'healthy',
      uptime: 0,
      memoryUsage: {}
    }
  });
  

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [, setNotifications] = useState([]);
  const [visitorCount, setVisitorCount] = useState(null);
  const [visitStats, setVisitStats] = useState({ daily: null, monthly: null });
  const [dailyChartData, setDailyChartData] = useState([]);

  const fetchDashboardData = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('No authentication token found. Please login again.');
        setLoading(false);
        return;
      }

      const headers = { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      
      const statsResponse = await axios.get(`${API_BASE_URL}/api/admin/stats`, { headers });

      if (statsResponse.data) {
        setStats(prevStats => ({
          ...prevStats,
          ...statsResponse.data
        }));
      }



      setError('');
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Authentication failed. Please check your login credentials.');
      } else if (err.response?.status === 404) {
        setError('Dashboard endpoint not found. Please check server configuration.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Unable to connect to server. Please check if the server is running.');
      } else {
        setError(`Failed to fetch dashboard data: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  useEffect(() => {
    const newNotifications = [];
    
    if (stats.newTickets24h > 0) {
      newNotifications.push({
        id: 'tickets',
        type: 'warning',
        message: `${stats.newTickets24h} new support ticket(s) in the last 24 hours`,
        link: '/admin/tickets'
      });
    }
    
    if (stats.newContacts24h > 5) {
      newNotifications.push({
        id: 'contacts',
        type: 'info',
        message: `${stats.newContacts24h} new contact form submissions`,
        link: '/admin/contacts'
      });
    }

    if (stats.systemHealth.status !== 'healthy') {
      newNotifications.push({
        id: 'system',
        type: 'error',
        message: `System health: ${stats.systemHealth.status}`,
        link: '/admin/health'
      });
    }

    setNotifications(newNotifications);
  }, [stats]);

  // Fetch visitor count for admin
  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/visitor/visitor-count`);
        if (res.data && res.data.success) {
          setVisitorCount(res.data.count);
        }
      } catch (err) {
        setVisitorCount('N/A');
      }
    };
    fetchVisitorCount();
  }, []);

  // Fetch daily and monthly visit stats
  useEffect(() => {
    const fetchVisitStats = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/visitor/visit-stats`);
        if (res.data && res.data.success) {
          setVisitStats({ daily: res.data.daily, monthly: res.data.monthly });
        }
      } catch (err) {
        setVisitStats({ daily: 'N/A', monthly: 'N/A' });
      }
    };
    fetchVisitStats();
    const interval = setInterval(fetchVisitStats, 20000); // 20 seconds
    return () => clearInterval(interval);
  }, []);

  // Fetch daily visit data for the current month (for chart)
  useEffect(() => {
    const fetchDailyChartData = async () => {
      try {
        // Get the first day of the month
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        // Prepare an array for all days in the month
        const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          return {
            date: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
            day: day,
            count: 0
          };
        });
        // Fetch all visits for this month
        const res = await axios.get(`${API_BASE_URL}/api/visitor/visit-stats-daily`);
        if (res.data && res.data.success && Array.isArray(res.data.dailyCounts)) {
          // Merge API data into daysArray
          res.data.dailyCounts.forEach(({ date, count }) => {
            const d = new Date(date);
            const day = d.getDate();
            if (daysArray[day - 1]) daysArray[day - 1].count = count;
          });
        }
        setDailyChartData(daysArray);
      } catch (err) {
        setDailyChartData([]);
      }
    };
    fetchDailyChartData();
    const interval = setInterval(fetchDailyChartData, 20000); // 20 seconds
    return () => clearInterval(interval);
  }, []);


  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'degraded': return 'text-orange-600 bg-orange-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'projects', label: 'Projects' },
    { key: 'tasks', label: 'Tasks' },
    { key: 'invoices', label: 'Invoices' },
    { key: 'analytics', label: 'Analytics' },
    { key: 'content', label: 'Content' },
    { key: 'users', label: 'Users' },
    { key: 'settings', label: 'Settings' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-900 mt-4">Loading dashboard...</h2>
          <p className="text-gray-500 mt-2">Fetching real-time data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="h-12 w-12 text-red-500 mx-auto mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-red-600 mb-2">Dashboard Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-2">
            <button
              onClick={fetchDashboardData}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mr-2"
            >
              Retry
            </button>
            <button
              onClick={() => window.location.href = '/admin/login'}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Go to Login
            </button>
          </div>
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
            <p className="font-semibold">Debug Info:</p>
            <p>Token: {localStorage.getItem('adminToken') ? 'Present' : 'Missing'}</p>
            <p>API URL: {API_BASE_URL}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">All modules in one place</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(stats.systemHealth.status)}`}>
                {stats.systemHealth.status}
              </div>
              <button
                onClick={fetchDashboardData}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center space-x-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh</span>
              </button>
            </div>
          </div>
          <div className="flex gap-4 border-b mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`py-2 px-4 -mb-px border-b-2 ${activeTab === tab.key ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Welcome to the Admin Dashboard</h2>
            <div className="mb-6 flex flex-wrap gap-4">
              <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-2xl px-6 py-4 shadow-lg flex flex-col items-center min-w-[160px]">
                <span className="text-3xl font-black">{visitorCount !== null ? visitorCount : '...'}</span>
                <span className="text-base font-semibold mt-1">Total Website Visitors</span>
              </div>
              <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-2xl px-6 py-4 shadow-lg flex flex-col items-center min-w-[160px]">
                <span className="text-3xl font-black">{visitStats.daily !== null ? visitStats.daily : '...'}</span>
                <span className="text-base font-semibold mt-1">Today's Visits</span>
              </div>
              <div className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-2xl px-6 py-4 shadow-lg flex flex-col items-center min-w-[160px]">
                <span className="text-3xl font-black">{visitStats.monthly !== null ? visitStats.monthly : '...'}</span>
                <span className="text-base font-semibold mt-1">This Month's Visits</span>
              </div>
            </div>
            {/* Chart for daily visits this month */}
            <div className="bg-white rounded-2xl shadow p-4 mb-8 max-w-3xl">
              <h3 className="text-lg font-bold mb-2 text-gray-800">Daily Visits (This Month)</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={dailyChartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p>Select a tab above to manage projects, tasks, invoices, analytics, content, users, or settings.</p>
          </div>
        )}
        {activeTab === 'projects' && <ProjectDashboard />}
        {activeTab === 'tasks' && <TaskDashboard />}
        {activeTab === 'invoices' && <InvoiceDashboard />}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
        {activeTab === 'content' && <ContentManager />}
        {activeTab === 'users' && <UserList />}
        {activeTab === 'settings' && <SettingsDashboard />}
      </div>
    </div>
  );
};

export default AdminDashboard; 