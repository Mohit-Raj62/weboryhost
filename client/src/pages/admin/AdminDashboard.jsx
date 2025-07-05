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
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import jobListings from '../../data/jobListings';

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
  const [careers, setCareers] = useState([]);

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
      
      const [statsResponse, activityResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/admin/stats`, { headers }),
        axios.get(`${API_BASE_URL}/api/admin/activity?limit=10`, { headers })
      ]);

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

  useEffect(() => {
    fetchDashboardData();
    fetchTeamData();
    setCareers(jobListings);
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [fetchDashboardData, fetchTeamData]);

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'degraded': return 'text-orange-600 bg-orange-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  // Removed unused getProgressColor function

  const tabs = [
    { key: 'overview', label: 'Overview', icon: '📊' },
    { key: 'projects', label: 'Projects', icon: '📁' },
    { key: 'clients', label: 'Clients', icon: '👥' },
    { key: 'tasks', label: 'Tasks', icon: '✅' },
    { key: 'invoices', label: 'Invoices', icon: '💰' },
    { key: 'team', label: 'Team', icon: '👨‍💼' },
    { key: 'analytics', label: 'Analytics', icon: '📈' },
    { key: 'content', label: 'Content', icon: '📝' },
    { key: 'settings', label: 'Settings', icon: '⚙️' },
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Agency Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage projects, clients, and team performance</p>
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
          
          {/* Navigation Tabs */}
          <div className="flex gap-4 border-b mb-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`py-2 px-4 -mb-px border-b-2 whitespace-nowrap flex items-center space-x-2 ${
                  activeTab === tab.key 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Projects</p>
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.totalProjects)}</p>
                    <p className="text-sm text-green-600">+12% from last month</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Clients</p>
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.totalClients)}</p>
                    <p className="text-sm text-green-600">+8% from last month</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.totalTasks)}</p>
                    <p className="text-sm text-blue-600">{stats.completedTasks} completed</p>
                  </div>
                  <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
          <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                    <p className="text-sm text-green-600">+23% from last month</p>
                  </div>
                  <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Project Progress */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={projectProgressData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
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

            {/* Task Completion Rate Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Completion Rate</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={taskCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [name === 'completionRate' ? `${value}%` : value, name]} />
                  <Bar dataKey="completionRate" fill="#10B981" name="Completion Rate" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
              <div className="space-y-3">
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
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity Feed</h3>
              <div className="space-y-4">
                {[
                  { type: 'project', action: 'Project "E-commerce Website" updated', time: '2 hours ago', user: 'John Doe' },
                  { type: 'task', action: 'Task "Payment Integration" completed', time: '4 hours ago', user: 'Mike Johnson' },
                  { type: 'invoice', action: 'Invoice #INV-2024-002 sent', time: '6 hours ago', user: 'Jane Smith' },
                  { type: 'client', action: 'New client "TechCorp Inc." added', time: '1 day ago', user: 'Sarah Wilson' },
                  { type: 'task', action: 'Task "Mobile Testing" assigned', time: '1 day ago', user: 'Alex Brown' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      activity.type === 'project' ? 'bg-blue-100' :
                      activity.type === 'task' ? 'bg-green-100' :
                      activity.type === 'invoice' ? 'bg-yellow-100' : 'bg-purple-100'
                    }`}>
                      <svg className={`h-4 w-4 ${
                        activity.type === 'project' ? 'text-blue-600' :
                        activity.type === 'task' ? 'text-green-600' :
                        activity.type === 'invoice' ? 'text-yellow-600' : 'text-purple-600'
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
          </div>
        )}

        {activeTab === 'projects' && <ProjectDashboard />}
        {activeTab === 'tasks' && <TaskDashboard />}
        {activeTab === 'invoices' && <InvoiceDashboard />}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
        {activeTab === 'content' && <ContentManager />}
        {activeTab === 'team' && (
          <div className="space-y-6">
            {/* Team Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Team Management</h3>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Add Member
                </button>
              </div>
              
              {/* Team Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-600">Total Members</p>
                  <p className="text-2xl font-bold text-blue-900">{teamData.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-600">Active Members</p>
                  <p className="text-2xl font-bold text-green-900">{teamData.filter(member => member.status === 'active').length}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-600">Departments</p>
                  <p className="text-2xl font-bold text-purple-900">{new Set(teamData.map(member => member.department)).size}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-yellow-600">Leadership</p>
                  <p className="text-2xl font-bold text-yellow-900">{teamData.filter(member => member.department === 'Leadership').length}</p>
                </div>
              </div>

              {/* Team Members Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamData.map((member) => (
                  <div key={member.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="text-4xl">{member.image}</div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.role}</p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {member.status}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{member.bio}</p>
                    
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-500 mb-2">Skills</p>
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
                    
                    <div className="space-y-2 text-sm">
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
                    
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-md text-sm hover:bg-indigo-700">
                        Edit
                      </button>
                      <button className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-md text-sm hover:bg-gray-700">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from(new Set(teamData.map(member => member.department))).map((dept) => (
                  <div key={dept} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">{dept}</h4>
                    <p className="text-2xl font-bold text-indigo-600">
                      {teamData.filter(member => member.department === dept).length}
                    </p>
                    <p className="text-sm text-gray-600">members</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'settings' && <SettingsDashboard />}
      </div>
    </div>
  );
};

export default AdminDashboard; 