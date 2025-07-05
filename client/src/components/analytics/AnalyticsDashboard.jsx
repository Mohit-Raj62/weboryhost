import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data for analytics
  const revenueData = [
    { month: 'Jan', revenue: 45000, projects: 8, clients: 12 },
    { month: 'Feb', revenue: 52000, projects: 10, clients: 15 },
    { month: 'Mar', revenue: 48000, projects: 9, clients: 13 },
    { month: 'Apr', revenue: 61000, projects: 12, clients: 18 },
    { month: 'May', revenue: 55000, projects: 11, clients: 16 },
    { month: 'Jun', revenue: 67000, projects: 14, clients: 20 }
  ];

  const projectStatusData = [
    { name: 'Completed', value: 45, color: '#10B981' },
    { name: 'In Progress', value: 30, color: '#3B82F6' },
    { name: 'Planning', value: 15, color: '#F59E0B' },
    { name: 'On Hold', value: 10, color: '#EF4444' }
  ];

  const clientSatisfactionData = [
    { metric: 'Overall Satisfaction', value: 4.8, max: 5 },
    { metric: 'Communication', value: 4.7, max: 5 },
    { metric: 'Quality', value: 4.9, max: 5 },
    { metric: 'Timeliness', value: 4.6, max: 5 },
    { metric: 'Value', value: 4.8, max: 5 }
  ];

  const teamPerformanceData = [
    { name: 'John Doe', completed: 12, total: 15, efficiency: 85 },
    { name: 'Jane Smith', completed: 18, total: 20, efficiency: 90 },
    { name: 'Mike Johnson', completed: 8, total: 12, efficiency: 75 },
    { name: 'Sarah Wilson', completed: 15, total: 18, efficiency: 88 },
    { name: 'Alex Brown', completed: 10, total: 14, efficiency: 80 }
  ];

  const websiteTrafficData = [
    { day: 'Mon', visitors: 1200, pageViews: 3500, conversions: 45 },
    { day: 'Tue', visitors: 1350, pageViews: 4200, conversions: 52 },
    { day: 'Wed', visitors: 1100, pageViews: 3200, conversions: 38 },
    { day: 'Thu', visitors: 1500, pageViews: 4800, conversions: 65 },
    { day: 'Fri', visitors: 1400, pageViews: 4100, conversions: 58 },
    { day: 'Sat', visitors: 800, pageViews: 2400, conversions: 25 },
    { day: 'Sun', visitors: 600, pageViews: 1800, conversions: 18 }
  ];

  const servicePerformanceData = [
    { service: 'Web Design', revenue: 35000, projects: 8, satisfaction: 4.8 },
    { service: 'Development', revenue: 45000, projects: 12, satisfaction: 4.7 },
    { service: 'SEO', revenue: 18000, projects: 6, satisfaction: 4.9 },
    { service: 'Marketing', revenue: 22000, projects: 5, satisfaction: 4.6 },
    { service: 'Consulting', revenue: 15000, projects: 4, satisfaction: 4.8 }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculateGrowth = (current, previous) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
          <p className="text-gray-600">Track performance and insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(328000)}</p>
              <p className="text-sm text-green-600">+{calculateGrowth(67000, 55000)}% from last month</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900">14</p>
              <p className="text-sm text-blue-600">+2 new this month</p>
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
              <p className="text-sm font-medium text-gray-600">Client Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">4.8/5</p>
              <p className="text-sm text-green-600">+0.2 from last month</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Website Traffic</p>
              <p className="text-2xl font-bold text-gray-900">8,450</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
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

        {/* Project Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {projectStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Client Satisfaction Radar Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Satisfaction Metrics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={clientSatisfactionData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis angle={30} domain={[0, 5]} />
            <Radar name="Satisfaction" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Team Performance */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Team Member</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Completed Tasks</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Total Tasks</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Efficiency</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Progress</th>
              </tr>
            </thead>
            <tbody>
              {teamPerformanceData.map((member, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{member.name}</td>
                  <td className="py-3 px-4 text-gray-600">{member.completed}</td>
                  <td className="py-3 px-4 text-gray-600">{member.total}</td>
                  <td className="py-3 px-4 text-gray-600">{member.efficiency}%</td>
                  <td className="py-3 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${member.efficiency}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Service Performance */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={servicePerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="service" />
            <YAxis />
            <Tooltip formatter={(value, name) => [name === 'revenue' ? formatCurrency(value) : value, name]}/>
            <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
            <Bar dataKey="satisfaction" fill="#10B981" name="Satisfaction" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Website Traffic */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Website Traffic</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={websiteTrafficData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="visitors" stroke="#3B82F6" strokeWidth={2} />
            <Line type="monotone" dataKey="pageViews" stroke="#10B981" strokeWidth={2} />
            <Line type="monotone" dataKey="conversions" stroke="#F59E0B" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 