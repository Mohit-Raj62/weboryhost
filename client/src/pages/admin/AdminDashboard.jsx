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
import SupportTicketDashboard from '../../components/admin/SupportTicketDashboard';
import WebDevInquiries from '../../components/admin/WebDevInquiries';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';


const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalClients: 0,
    totalTasks: 0,
    completedTasks: 0,
    totalInvoices: 0,
    paidInvoices: 0,
    totalRevenue: 0,
    teamMembers: 0,
    activeUsers: 0,
    newProjects24h: 0,
    newTasks24h: 0,
    newInvoices24h: 0,
    systemHealth: {
      status: 'healthy',
      uptime: 0,
      memoryUsage: {}
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [teamData, setTeamData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [actionLoading, setActionLoading] = useState({});

  const handleStatusChange = async (id, status) => {
    setActionLoading((prev) => ({ ...prev, [id]: true }));
    try {
      await axios.patch(`${API_BASE_URL}/api/quotes/${id}/status`, { status });
      setQuotes((prev) => prev.map(q => q._id === id ? { ...q, status } : q));
    } catch (err) {
      // Optionally show error
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  // Memoize fetchDashboardData and fetchTeamData with empty dependency array since they don't use any props/state
  const fetchDashboardData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      }
      
      console.log('🔄 Fetching dashboard data...');
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('No authentication token found. Please login again.');
        setLoading(false);
        setRefreshing(false);
        return;
      }

      const headers = { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      
      console.log('📡 Making API request to:', `${API_BASE_URL}/api/admin/stats`);
      
      const [statsResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/admin/stats`, { headers })
      ]);

      console.log('✅ Dashboard data received:', statsResponse.data);

      if (statsResponse.data) {
        setStats(prevStats => ({
          ...prevStats,
          ...statsResponse.data
        }));
      }

      setError('');
      console.log('✅ Dashboard data updated successfully');
      
      if (isRefresh) {
        setRefreshMessage('Dashboard refreshed successfully!');
        setTimeout(() => setRefreshMessage(''), 3000);
      }
    } catch (err) {
      console.error('❌ Error fetching dashboard data:', err);
      console.error('Error details:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        url: err.config?.url
      });
      
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
      setRefreshing(false);
    }
  }, []);

  const fetchTeamData = useCallback(() => {
    // Team data from About page
    const teamMembers = [
      {
        id: 1,
        name: "Mohit Sinha",
        role: "CEO, Founder & CTO",
        image: "👨‍💼",
        bio: "Visionary leader, founder, and CTO driving innovation, strategy, and scalable tech solutions—melding forward-thinking vision with hands-on technical depth to steer transformative roadmaps and high-performing teams.",
        skills: ["Leadership", "Strategy", "Tech Architecture"],
        email: "singm2698@gmail.com",
        phone: "+91-62059 47359",
        status: "active",
        department: "Leadership",
        joinDate: "2024-01-01"
      },
      {
        id: 2,
        name: "Utkarsh Vats",
        role: "Co-Founder, CMO & COO",
        image: "👨‍💻",
        bio: "Co-Founder driving brand growth, marketing strategy, and operational excellence with proven track record in scaling businesses.",
        skills: ["Marketing", "Operations", "Business Development", "Social Media", "Leadership"],
        email: "utkarshvats3434@gmail.com",
        phone: "+91-94316 15128",
        status: "active",
        department: "Leadership",
        joinDate: "2024-01-01"
      },
      {
        id: 3,
        name: "Saloni Singh",
        role: "HR, SMM & Creative Director",
        image: "👩‍🎨",
        bio: "People-focused HR expert, growth-driven social media strategist, and visionary creative lead crafting impactful brand experiences.",
        skills: ["Creative Design", "HR Management", "Social Media"],
        email: "salonisingh17781@gmail.com",
        phone: "+91-9142812872",
        status: "active",
        department: "HR & Creative",
        joinDate: "2024-01-15"
      },
      {
        id: 4,
        name: "Piyush Aryan",
        role: "Lead Developer, Marketing Head, Content Writer",
        image: "👨‍💻",
        bio: "Strategic marketing head, and creative content writer driving technical innovation and brand visibility.",
        skills: ["Content Strategy", "Digital Marketing", "Social Media", "Content Writing"],
        email: "thepiyusharyan@gmail.com",
        phone: "+91-7992421732",
        status: "active",
        department: "Development & Marketing",
        joinDate: "2024-02-01"
      },
      {
        id: 5,
        name: "Rupesh Singh",
        role: "SMM Head, PR Head & Product Manager",
        image: "👨‍💻",
        bio: "Digital-first social media expert, reputation-focused PR lead, and product manager turning innovative ideas into user-centric solutions.",
        skills: ["Product Management", "Public Relations", "Social Media Strategy"],
        email: "rupesh.jbit@gmail.com",
        phone: "+91-7667959622",
        status: "active",
        department: "Product & PR",
        joinDate: "2024-02-15"
      }
    ];
    
    setTeamData(teamMembers);
  }, []);

  const fetchQuotes = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/quotes`);
      if (res.data && res.data.success) {
        setQuotes(res.data.quotes);
      }
    } catch (err) {
      // Optionally handle error
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
    fetchTeamData();
    // Only set interval once on mount
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchDashboardData, fetchTeamData]);

  useEffect(() => {
    if (activeTab === 'serviceRequests') {
      fetchQuotes();
    }
  }, [activeTab, fetchQuotes]);

  // Add keyboard shortcut for refresh (Ctrl+R)
  useEffect(() => {
    const handleKeyPress = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault();
        fetchDashboardData(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [fetchDashboardData]);

  // Removed notifications logic since notifications state was removed

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const tabs = [
    { key: 'overview', label: 'Overview', icon: '📊' },
    { key: 'projects', label: 'Projects', icon: '📁' },
    { key: 'clients', label: 'Clients', icon: '👥' },
    { key: 'tasks', label: 'Tasks', icon: '✅' },
    { key: 'invoices', label: 'Invoices', icon: '💰' },
    { key: 'support-tickets', label: 'Support Tickets', icon: '🎫' },
    { key: 'webdev-inquiries', label: 'WebDev Inquiries', icon: '🌐' },
    { key: 'team', label: 'Team', icon: '👨‍💼' },
    { key: 'analytics', label: 'Analytics', icon: '📈' },
    { key: 'content', label: 'Content', icon: '📝' },
    { key: 'settings', label: 'Settings', icon: '⚙️' },
    { key: 'serviceRequests', label: 'Service Requests', icon: '💬' },
  ];

  // Mock data for charts
  const projectProgressData = [
    { name: 'Planning', value: 25, color: '#3B82F6' },
    { name: 'Development', value: 40, color: '#10B981' },
    { name: 'Testing', value: 20, color: '#F59E0B' },
    { name: 'Deployment', value: 15, color: '#EF4444' }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 }
  ];

  const taskCompletionData = [
    { day: 'Mon', completed: 12, total: 20, completionRate: 60 },
    { day: 'Tue', completed: 15, total: 18, completionRate: 83 },
    { day: 'Wed', completed: 8, total: 15, completionRate: 53 },
    { day: 'Thu', completed: 20, total: 22, completionRate: 91 },
    { day: 'Fri', completed: 14, total: 19, completionRate: 74 },
    { day: 'Sat', completed: 6, total: 8, completionRate: 75 },
    { day: 'Sun', completed: 3, total: 5, completionRate: 60 }
  ];

  // Sidebar state for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Sidebar */}
      <aside className={`fixed z-30 inset-y-0 left-0 w-64 bg-gradient-to-b from-indigo-600 via-indigo-500 to-blue-500 shadow-xl border-r border-indigo-200 transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:w-56 md:block`}>
        <div className="flex flex-col items-center py-6 px-4 border-b border-indigo-300">
          <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white text-indigo-700 text-3xl font-bold shadow">A</span>
          <span className="mt-2 text-lg font-extrabold text-white tracking-wide">Admin</span>
        </div>
        <nav className="mt-6 flex flex-col gap-1 px-2">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl text-base font-semibold transition-all
                ${activeTab === tab.key
                  ? 'bg-white text-indigo-700 shadow font-bold scale-105'
                  : 'text-white/90 hover:bg-indigo-400 hover:text-white/100'}
              `}
              onClick={() => { setActiveTab(tab.key); setSidebarOpen(false); }}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-10 bg-white/90 backdrop-blur shadow border-b flex items-center justify-between px-4 py-3 md:py-4">
          <div className="flex items-center gap-2">
            <button className="md:hidden text-gray-700" onClick={() => setSidebarOpen(true)}>
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <h1 className="text-lg sm:text-2xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
            </div>
              <button
                onClick={() => fetchDashboardData(true)}
                disabled={refreshing}
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-3 py-2 rounded-lg shadow hover:from-indigo-600 hover:to-blue-600 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
              >
                {refreshing ? (
                  <svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
                <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
      </header>

        {/* Main Section */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 md:py-8">
        {/* Success Message */}
        {refreshMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 shadow flex items-center gap-2 text-xs w-full">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            <span className="text-green-800 font-medium">{refreshMessage}</span>
          </div>
        )}
        {activeTab === 'overview' && (
            <section className="w-full max-w-5xl mx-auto flex flex-col gap-6 md:gap-10">
            {/* Summary Cards */}
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {/* Card 1 */}
                <div className="flex flex-col justify-between bg-gradient-to-br from-indigo-100 to-blue-50 rounded-2xl shadow-lg p-5 hover:shadow-2xl transition w-full min-h-[120px]">
                <div className="flex items-center justify-between">
                  <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Projects</p>
                      <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">{formatNumber(stats.totalProjects)}</p>
                      <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                  </div>
                    <div className="h-10 w-10 bg-blue-200 rounded-xl flex items-center justify-center shadow">
                      <span className="text-2xl">📁</span>
                  </div>
                </div>
              </div>
                {/* Card 2 */}
                <div className="flex flex-col justify-between bg-gradient-to-br from-green-100 to-green-50 rounded-2xl shadow-lg p-5 hover:shadow-2xl transition w-full min-h-[120px]">
                <div className="flex items-center justify-between">
                  <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Active Clients</p>
                      <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">{formatNumber(stats.totalClients)}</p>
                      <p className="text-xs text-green-600 mt-1">+8% from last month</p>
                  </div>
                    <div className="h-10 w-10 bg-green-200 rounded-xl flex items-center justify-center shadow">
                      <span className="text-2xl">👥</span>
                  </div>
                </div>
              </div>
                {/* Card 3 */}
                <div className="flex flex-col justify-between bg-gradient-to-br from-indigo-100 to-blue-50 rounded-2xl shadow-lg p-5 hover:shadow-2xl transition w-full min-h-[120px]">
                <div className="flex items-center justify-between">
                  <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Tasks</p>
                      <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">{formatNumber(stats.totalTasks)}</p>
                      <p className="text-xs text-blue-600 mt-1">{stats.completedTasks} completed</p>
                  </div>
                    <div className="h-10 w-10 bg-indigo-200 rounded-xl flex items-center justify-center shadow">
                      <span className="text-2xl">✅</span>
                  </div>
                </div>
              </div>
                {/* Card 4 */}
                <div className="flex flex-col justify-between bg-gradient-to-br from-red-100 to-orange-50 rounded-2xl shadow-lg p-5 hover:shadow-2xl transition w-full min-h-[120px]">
                <div className="flex items-center justify-between">
          <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Support Tickets</p>
                      <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">{formatNumber(stats.totalTickets || 0)}</p>
                      <p className="text-xs text-red-600 mt-1">{stats.openTickets || 0} open</p>
                  </div>
                    <div className="h-10 w-10 bg-red-200 rounded-xl flex items-center justify-center shadow">
                      <span className="text-2xl">🎫</span>
                    </div>
                  </div>
                </div>
              </div>
            {/* Charts Section */}
              <div className="flex flex-col lg:flex-row gap-4 md:gap-6 w-full">
              {/* Revenue Chart */}
                <div className="bg-white rounded-2xl shadow-lg p-4 flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2"><span>💰</span> Revenue Trend</h3>
                  <div className="w-full min-w-[220px]">
                  <ResponsiveContainer width="100%" height={220} minWidth={200}>
                    <AreaChart data={revenueData} margin={{ left: 0, right: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" fontSize={10} />
                      <YAxis fontSize={10} />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              {/* Project Progress */}
                <div className="bg-white rounded-2xl shadow-lg p-4 flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2"><span>📊</span> Project Status</h3>
                  <div className="w-full min-w-[220px]">
                  <ResponsiveContainer width="100%" height={220} minWidth={200}>
                    <PieChart>
                      <Pie
                        data={projectProgressData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {projectProgressData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            {/* Task Completion Rate Chart */}
              <div className="bg-white rounded-2xl shadow-lg p-4 w-full">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2"><span>✅</span> Task Completion Rate</h3>
                <div className="w-full min-w-[220px]">
                  <ResponsiveContainer width="100%" height={220} minWidth={200}>
                    <BarChart data={taskCompletionData} margin={{ left: 0, right: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" fontSize={10} />
                      <YAxis fontSize={10} />
                      <Tooltip formatter={(value, name) => [name === 'completionRate' ? `${value}%` : value, name]} />
                      <Bar dataKey="completionRate" fill="#10B981" name="Completion Rate" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            {/* Upcoming Deadlines */}
              <div className="bg-white rounded-2xl shadow-lg p-4 w-full">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2"><span>⏰</span> Upcoming Deadlines</h3>
                <div className="space-y-2">
                {[
                  { project: 'E-commerce Website', deadline: '2024-02-15', daysLeft: 3, priority: 'high' },
                  { project: 'Mobile App Development', deadline: '2024-02-20', daysLeft: 8, priority: 'medium' },
                  { project: 'SEO Optimization', deadline: '2024-02-25', daysLeft: 13, priority: 'low' },
                  { project: 'Brand Identity Design', deadline: '2024-03-01', daysLeft: 17, priority: 'medium' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`h-3 w-3 rounded-full ${
                        item.priority === 'high' ? 'bg-red-500' : 
                        item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.project}</p>
                        <p className="text-xs text-gray-500">Due: {item.deadline}</p>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${
                      item.daysLeft <= 3 ? 'text-red-600' : 
                      item.daysLeft <= 7 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {item.daysLeft} days left
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Recent Activity Feed */}
              <div className="bg-white rounded-2xl shadow-lg p-4 w-full">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2"><span>🕒</span> Recent Activity Feed</h3>
                <div className="space-y-2">
                {[
                  { type: 'project', action: 'Project "E-commerce Website" updated', time: '2 hours ago', user: 'John Doe' },
                  { type: 'task', action: 'Task "Payment Integration" completed', time: '4 hours ago', user: 'Mike Johnson' },
                  { type: 'invoice', action: 'Invoice #INV-2024-002 sent', time: '6 hours ago', user: 'Jane Smith' },
                  { type: 'support_ticket', action: 'New support ticket: "Login Issue"', time: '1 hour ago', user: 'Support Team' },
                  { type: 'client', action: 'New client "TechCorp Inc." added', time: '1 day ago', user: 'Sarah Wilson' },
                  { type: 'task', action: 'Task "Mobile Testing" assigned', time: '1 day ago', user: 'Alex Brown' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      activity.type === 'project' ? 'bg-blue-100' :
                      activity.type === 'task' ? 'bg-green-100' :
                      activity.type === 'invoice' ? 'bg-yellow-100' :
                      activity.type === 'support_ticket' ? 'bg-red-100' : 'bg-purple-100'
                    }`}>
                      <svg className={`h-4 w-4 ${
                        activity.type === 'project' ? 'text-blue-600' :
                        activity.type === 'task' ? 'text-green-600' :
                        activity.type === 'invoice' ? 'text-yellow-600' :
                        activity.type === 'support_ticket' ? 'text-red-600' : 'text-purple-600'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">by {activity.user} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </section>
        )}
        {activeTab === 'projects' && (
            <section className="bg-white/80 rounded-2xl shadow-xl p-2 md:p-6 mb-4 w-full overflow-x-auto">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"><span className="text-xl sm:text-2xl">📁</span><h2 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900">Projects</h2></div>
            <div className="w-full min-w-[250px]" style={{ minWidth: 0 }}>
              <ProjectDashboard />
            </div>
          </section>
        )}
        {activeTab === 'tasks' && (
            <section className="bg-white/80 rounded-2xl shadow-xl p-2 md:p-6 mb-4 w-full overflow-x-auto">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"><span className="text-xl sm:text-2xl">✅</span><h2 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900">Tasks</h2></div>
            <div className="w-full min-w-[250px]" style={{ minWidth: 0 }}>
              <TaskDashboard />
            </div>
          </section>
        )}
        {activeTab === 'invoices' && (
            <section className="bg-white/80 rounded-2xl shadow-xl p-2 md:p-6 mb-4 w-full overflow-x-auto">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"><span className="text-xl sm:text-2xl">💰</span><h2 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900">Invoices</h2></div>
            <div className="w-full min-w-[250px]" style={{ minWidth: 0 }}>
              <InvoiceDashboard />
            </div>
          </section>
        )}
        {activeTab === 'support-tickets' && (
            <section className="bg-white/80 rounded-2xl shadow-xl p-2 md:p-6 mb-4 w-full overflow-x-auto">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"><span className="text-xl sm:text-2xl">🎫</span><h2 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900">Support Tickets</h2></div>
            <div className="w-full min-w-[250px]" style={{ minWidth: 0 }}>
              <SupportTicketDashboard />
            </div>
          </section>
        )}
        {activeTab === 'webdev-inquiries' && (
            <section className="bg-white/80 rounded-2xl shadow-xl p-2 md:p-6 mb-4 w-full overflow-x-auto">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"><span className="text-xl sm:text-2xl">🌐</span><h2 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900">WebDev Inquiries</h2></div>
            <div className="w-full min-w-[250px]" style={{ minWidth: 0 }}>
              <WebDevInquiries />
            </div>
          </section>
        )}
        {activeTab === 'analytics' && (
            <section className="bg-white/80 rounded-2xl shadow-xl p-2 md:p-6 mb-4 w-full overflow-x-auto">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"><span className="text-xl sm:text-2xl">📈</span><h2 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900">Analytics</h2></div>
            <div className="w-full min-w-[250px]" style={{ minWidth: 0 }}>
              <AnalyticsDashboard />
            </div>
          </section>
        )}
        {activeTab === 'content' && (
            <section className="bg-white/80 rounded-2xl shadow-xl p-2 md:p-6 mb-4 w-full overflow-x-auto">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"><span className="text-xl sm:text-2xl">📝</span><h2 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900">Content</h2></div>
            <div className="w-full min-w-[250px]" style={{ minWidth: 0 }}>
              <ContentManager />
            </div>
          </section>
        )}
        {activeTab === 'team' && (
          <section className="space-y-6 sm:space-y-8 w-full">
              <div className="bg-white/80 rounded-2xl shadow-xl p-2 sm:p-6 border border-gray-100 mb-4 sm:mb-8 w-full">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"><span className="text-xl sm:text-2xl">👨‍💼</span><h2 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900">Team Management</h2></div>
              {/* Team Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6 w-full">
                <div className="bg-blue-50 p-2 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm font-medium text-blue-600">Total Members</p>
                  <p className="text-lg sm:text-2xl font-bold text-blue-900">{teamData.length}</p>
                </div>
                <div className="bg-green-50 p-2 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm font-medium text-green-600">Active Members</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-900">{teamData.filter(member => member.status === 'active').length}</p>
                </div>
                <div className="bg-purple-50 p-2 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm font-medium text-purple-600">Departments</p>
                  <p className="text-lg sm:text-2xl font-bold text-purple-900">{new Set(teamData.map(member => member.department)).size}</p>
                </div>
                <div className="bg-yellow-50 p-2 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm font-medium text-yellow-600">Leadership</p>
                  <p className="text-lg sm:text-2xl font-bold text-yellow-900">{teamData.filter(member => member.department === 'Leadership').length}</p>
                </div>
              </div>

              {/* Team Members Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 w-full">
                {teamData.map((member) => (
                  <div key={member.id} className="bg-gray-50 rounded-lg p-3 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow w-full">
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                      <div className="text-2xl sm:text-4xl">{member.image}</div>
                      <div className="flex-1">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900">{member.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{member.role}</p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {member.status}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-3">{member.bio}</p>
                    
                    <div className="mb-3 sm:mb-4">
                      <p className="text-xs font-medium text-gray-500 mb-1 sm:mb-2">Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                        {member.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{member.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-600">{member.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-gray-600">{member.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-gray-600">{member.department}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 sm:mt-4 flex space-x-2">
                      <button className="flex-1 bg-indigo-600 text-white px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm hover:bg-indigo-700">
                        Edit
                      </button>
                      <button className="flex-1 bg-gray-600 text-white px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm hover:bg-gray-700">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Overview */}
              <div className="bg-white/80 rounded-2xl shadow-xl p-2 sm:p-6 border border-gray-100 w-full">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"><span className="text-xl sm:text-2xl">🏢</span><h2 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900">Department Overview</h2></div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 w-full">
                {Array.from(new Set(teamData.map(member => member.department))).map((dept) => (
                  <div key={dept} className="bg-gray-50 p-2 sm:p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-xs sm:text-base">{dept}</h4>
                    <p className="text-lg sm:text-2xl font-bold text-indigo-600">
                      {teamData.filter(member => member.department === dept).length}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">members</p>
                  </div>
                ))}
              </div>
            </div> 
          </section>
        )}
        {activeTab === 'serviceRequests' && (
  <section className="bg-white/90 rounded-2xl shadow-2xl p-4 md:p-8 mb-8 w-full overflow-x-auto border border-gray-200">
    <div className="flex items-center gap-2 mb-6">
      <span className="text-2xl">💬</span>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">Service Requests</h2>
    </div>
    {quotes.length === 0 ? (
      <div className="text-center text-gray-500 py-12 text-lg font-medium">No service requests found yet.</div>
    ) : (
      <>
        <div className="overflow-x-auto hidden md:block">
          <table className="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden shadow-md">
            <thead className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Email</th>
                <th className="px-4 py-3 text-left font-semibold">Phone</th>
                <th className="px-4 py-3 text-left font-semibold">Service</th>
                <th className="px-4 py-3 text-left font-semibold">Budget</th>
                <th className="px-4 py-3 text-left font-semibold">Timeline</th>
                <th className="px-4 py-3 text-left font-semibold">Message</th>
                <th className="px-4 py-3 text-left font-semibold">Date</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {quotes.map((q, idx) => (
                <tr key={q._id} className={idx % 2 === 0 ? 'bg-gray-50 hover:bg-cyan-50 transition' : 'bg-white hover:bg-cyan-50 transition'}>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{q.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-cyan-700 underline">{q.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{q.phone}</td>
                  <td className="px-4 py-3 whitespace-nowrap capitalize">{q.service}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{q.budget}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{q.timeline}</td>
                  <td className="px-4 py-3 max-w-xs break-words">{q.message}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">{new Date(q.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[q.status] || 'bg-gray-200 text-gray-700'}`}>{q.status.charAt(0).toUpperCase() + q.status.slice(1)}</span>
                  </td>
                  <td className="px-4 py-3">
                    {q.status === 'pending' ? (
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white text-xs font-semibold shadow disabled:opacity-60"
                          disabled={actionLoading[q._id]}
                          onClick={() => handleStatusChange(q._id, 'accepted')}
                        >
                          {actionLoading[q._id] ? 'Accepting...' : 'Accept'}
                        </button>
                        <button
                          className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-xs font-semibold shadow disabled:opacity-60"
                          disabled={actionLoading[q._id]}
                          onClick={() => handleStatusChange(q._id, 'rejected')}
                        >
                          {actionLoading[q._id] ? 'Rejecting...' : 'Reject'}
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Card/List view for mobile */}
        <div className="md:hidden flex flex-col gap-4">
          {quotes.map((q) => (
            <div key={q._id} className="bg-white rounded-xl shadow p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-lg text-gray-900">{q.name}</div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[q.status] || 'bg-gray-200 text-gray-700'}`}>{q.status.charAt(0).toUpperCase() + q.status.slice(1)}</span>
              </div>
              <div className="text-sm text-gray-700 mb-1"><span className="font-semibold">Email:</span> <a href={`mailto:${q.email}`} className="text-cyan-700 underline">{q.email}</a></div>
              <div className="text-sm text-gray-700 mb-1"><span className="font-semibold">Phone:</span> {q.phone}</div>
              <div className="text-sm text-gray-700 mb-1"><span className="font-semibold">Service:</span> {q.service}</div>
              <div className="text-sm text-gray-700 mb-1"><span className="font-semibold">Budget:</span> {q.budget}</div>
              <div className="text-sm text-gray-700 mb-1"><span className="font-semibold">Timeline:</span> {q.timeline}</div>
              <div className="text-sm text-gray-700 mb-2"><span className="font-semibold">Message:</span> {q.message}</div>
              <div className="text-xs text-gray-400 mb-2">{new Date(q.createdAt).toLocaleString()}</div>
              {q.status === 'pending' ? (
                <div className="flex gap-2 mt-2">
                  <button
                    className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white text-xs font-semibold shadow disabled:opacity-60"
                    disabled={actionLoading[q._id]}
                    onClick={() => handleStatusChange(q._id, 'accepted')}
                  >
                    {actionLoading[q._id] ? 'Accepting...' : 'Accept'}
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-xs font-semibold shadow disabled:opacity-60"
                    disabled={actionLoading[q._id]}
                    onClick={() => handleStatusChange(q._id, 'rejected')}
                  >
                    {actionLoading[q._id] ? 'Rejecting...' : 'Reject'}
                  </button>
                </div>
              ) : (
                <span className="text-gray-400 text-xs">—</span>
              )}
            </div>
          ))}
        </div>
      </>
    )}
  </section>
)}
        {activeTab === 'settings' && (
            <section className="bg-white/80 rounded-2xl shadow-xl p-2 sm:p-6 border border-gray-100 mb-4 sm:mb-8 w-full overflow-x-auto">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"><span className="text-xl sm:text-2xl">⚙️</span><h2 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900">Settings</h2></div>
            <div className="w-full min-w-[250px]" style={{ minWidth: 0 }}>
              <SettingsDashboard />
            </div>
          </section>
        )}
      </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 