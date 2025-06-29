import React, { useState, useEffect } from 'react';
import { 
  Users, Settings, BarChart3, Shield, Flag, MessageSquare, 
  Edit, Calendar, FileText, Search, Bell, Home, Plus,
  Check, X, Eye, Trash2, UserCheck, UserX, Crown,
  Filter, Download, Upload, Globe, Lock
} from 'lucide-react';

const RoleBasedDashboard = () => {
  const [currentRole, setCurrentRole] = useState('administrator');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'editor', status: 'active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'moderator', status: 'active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'editor', status: 'suspended', lastLogin: '2024-01-10' }
  ]);

  const [posts] = useState([
    { id: 1, title: 'Getting Started with React', author: 'John Doe', status: 'published', date: '2024-01-15', views: 1250, comments: 8 },
    { id: 2, title: 'Advanced JavaScript Patterns', author: 'Jane Smith', status: 'pending', date: '2024-01-14', views: 0, comments: 0 },
    { id: 3, title: 'Web Design Trends 2024', author: 'Mike Johnson', status: 'draft', date: '2024-01-13', views: 0, comments: 2 }
  ]);

  const [comments] = useState([
    { id: 1, post: 'Getting Started with React', author: 'Anonymous', content: 'Great article! Very helpful.', status: 'approved', flagged: false },
    { id: 2, post: 'Advanced JavaScript Patterns', author: 'DevUser', content: 'This contains inappropriate content...', status: 'pending', flagged: true },
    { id: 3, post: 'Web Design Trends 2024', author: 'Designer', content: 'Love the new trends mentioned here.', status: 'approved', flagged: false }
  ]);

  const [analytics] = useState({
    totalUsers: 1250,
    totalPosts: 450,
    totalComments: 2340,
    totalViews: 125000,
    pendingModeration: 15,
    flaggedContent: 3
  });

  // Role-specific navigation
  const getNavigation = () => {
    const baseNav = [
      { id: 'dashboard', label: 'Dashboard', icon: Home }
    ];

    const roleSpecificNav = {
      administrator: [
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'posts', label: 'All Posts', icon: FileText },
        { id: 'comments', label: 'All Comments', icon: MessageSquare },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'settings', label: 'System Settings', icon: Settings }
      ],
      moderator: [
        { id: 'moderation', label: 'Content Moderation', icon: Shield },
        { id: 'posts', label: 'Post Review', icon: FileText },
        { id: 'comments', label: 'Comment Review', icon: MessageSquare },
        { id: 'flagged', label: 'Flagged Content', icon: Flag }
      ],
      editor: [
        { id: 'my-posts', label: 'My Posts', icon: Edit },
        { id: 'create', label: 'Create Post', icon: Plus },
        { id: 'schedule', label: 'Scheduled Posts', icon: Calendar },
        { id: 'drafts', label: 'Drafts', icon: FileText }
      ]
    };

    return [...baseNav, ...roleSpecificNav[currentRole]];
  };

  // Dashboard content based on role
  const renderDashboardContent = () => {
    switch (currentRole) {
      case 'administrator':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Posts</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics.totalPosts}</p>
                </div>
                <FileText className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics.totalViews.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-purple-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics.pendingModeration}</p>
                </div>
                <Shield className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </div>
        );
      case 'moderator':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Moderation</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics.pendingModeration}</p>
                </div>
                <Shield className="h-8 w-8 text-orange-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Flagged Content</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics.flaggedContent}</p>
                </div>
                <Flag className="h-8 w-8 text-red-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Comments Today</p>
                  <p className="text-3xl font-bold text-gray-900">45</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-500" />
              </div>
            </div>
          </div>
        );
      case 'editor':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">My Posts</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <FileText className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Drafts</p>
                  <p className="text-3xl font-bold text-gray-900">5</p>
                </div>
                <Edit className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Scheduled</p>
                  <p className="text-3xl font-bold text-gray-900">3</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </div>
          </div>
        );
    }
  };

  // Content management sections
  const renderUserManagement = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add User
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'administrator' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'moderator' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPostManagement = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Post Management</h2>
          <div className="flex space-x-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              <Download className="h-4 w-4 inline mr-2" />
              Export
            </button>
            {currentRole === 'editor' && (
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                <Plus className="h-4 w-4 inline mr-2" />
                New Post
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    post.status === 'published' ? 'bg-green-100 text-green-800' :
                    post.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.views}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    {currentRole === 'moderator' && post.status === 'pending' && (
                      <>
                        <button className="text-green-600 hover:text-green-900">
                          <Check className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCommentManagement = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Comment Management</h2>
      </div>
      <div className="p-6 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className={`border rounded-lg p-4 ${comment.flagged ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{comment.author}</span>
                  <span className="text-sm text-gray-500">on {comment.post}</span>
                  {comment.flagged && <Flag className="h-4 w-4 text-red-500" />}
                </div>
                <p className="mt-2 text-gray-700">{comment.content}</p>
                <div className="mt-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    comment.status === 'approved' ? 'bg-green-100 text-green-800' :
                    comment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {comment.status}
                  </span>
                </div>
              </div>
              {currentRole === 'moderator' && (
                <div className="flex space-x-2 ml-4">
                  <button className="text-green-600 hover:text-green-900">
                    <Check className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <X className="h-4 w-4" />
                  </button>
                  <button className="text-orange-600 hover:text-orange-900">
                    <Flag className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardContent();
      case 'users':
        return renderUserManagement();
      case 'posts':
      case 'my-posts':
        return renderPostManagement();
      case 'comments':
      case 'moderation':
        return renderCommentManagement();
      case 'analytics':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Analytics Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">User Growth</h3>
                <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600 rounded opacity-75 flex items-center justify-center">
                  <span className="text-white">Chart Placeholder</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Content Performance</h3>
                <div className="h-32 bg-gradient-to-r from-green-400 to-green-600 rounded opacity-75 flex items-center justify-center">
                  <span className="text-white">Chart Placeholder</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">System Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">General Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Site Maintenance Mode</span>
                    <button className="bg-gray-200 rounded-full w-12 h-6 relative">
                      <div className="bg-white w-5 h-5 rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">User Registration</span>
                    <button className="bg-blue-600 rounded-full w-12 h-6 relative">
                      <div className="bg-white w-5 h-5 rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'create':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Post</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea rows="10" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <div className="flex space-x-4">
                <button type="button" className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">Save Draft</button>
                <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Publish</button>
                <button type="button" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Schedule</button>
              </div>
            </form>
          </div>
        );
      default:
        return <div className="bg-white rounded-lg shadow-md p-6">Content for {activeTab}</div>;
    }
  };

  const navigation = getNavigation();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Crown className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500 capitalize">{currentRole}</p>
            </div>
          </div>
        </div>
        
        {/* Role Switcher */}
        <div className="p-4 border-b border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Switch Role</label>
          <select 
            value={currentRole} 
            onChange={(e) => {
              setCurrentRole(e.target.value);
              setActiveTab('dashboard');
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="administrator">Administrator</option>
            <option value="moderator">Moderator</option>
            <option value="editor">Editor</option>
          </select>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          {navigation.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 ${
                  activeTab === item.id ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-600' : 'text-gray-700'
                }`}
              >
                <IconComponent className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative">
                <Bell className="h-6 w-6 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {currentRole.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700 capitalize">{currentRole}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default RoleBasedDashboard; 