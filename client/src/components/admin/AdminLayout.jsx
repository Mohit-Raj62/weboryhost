import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Redirect to dashboard if accessing /admin
  React.useEffect(() => {
    if (location.pathname === '/admin') {
      navigate('/admin/dashboard');
    }
  }, [location.pathname, navigate]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur shadow sticky top-0 z-30">
        <h1 className="text-lg font-bold text-indigo-700">Admin Panel</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md bg-indigo-100 text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-white/80 backdrop-blur shadow-2xl border-r border-gray-100 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out flex flex-col min-h-screen`}> 
          <div className="h-16 flex items-center justify-center border-b border-gray-100">
            <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 text-2xl font-bold shadow">A</span>
            <span className="ml-2 text-xl font-extrabold text-gray-800 tracking-tight">Admin</span>
          </div>
          <nav className="mt-6 flex-1 overflow-y-auto">
            <div className="px-4 space-y-2">
              <Link
                to="/admin/dashboard"
                className={`flex items-center px-4 py-2 text-gray-700 rounded-md ${
                  isActive('/admin/dashboard') ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </Link>
              <Link
                to="/admin/users"
                className={`flex items-center px-4 py-2 text-gray-700 rounded-md ${
                  isActive('/admin/users') ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Users
              </Link>
              <Link
                to="/admin/roles"
                className={`flex items-center px-4 py-2 text-gray-700 rounded-md ${
                  isActive('/admin/roles') ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Roles
              </Link>
              <Link
                to="/admin/posts"
                className={`flex items-center px-4 py-2 text-gray-700 rounded-md ${
                  isActive('/admin/posts') ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Posts
              </Link>
              <Link
                to="/admin/comments"
                className={`flex items-center px-4 py-2 text-gray-700 rounded-md ${
                  isActive('/admin/comments') ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Comments
              </Link>
              <Link
                to="/admin/products"
                className={`flex items-center px-4 py-2 text-gray-700 rounded-md ${
                  isActive('/admin/products') ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18" />
                </svg>
                Products
              </Link>
              <Link
                to="/admin/careers"
                className={`flex items-center px-4 py-2 text-gray-700 rounded-md ${
                  isActive('/admin/careers') ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 01-8 0M12 14v7m-7-7a7 7 0 0114 0v7H5v-7z" />
                </svg>
                Careers
              </Link>
              <Link
                to="/admin/settings"
                className={`flex items-center px-4 py-2 text-gray-700 rounded-md ${
                  isActive('/admin/settings') ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Settings
              </Link>
              <Link
                to="/admin/profile"
                className={`flex items-center px-4 py-2 text-gray-700 rounded-md ${
                  isActive('/admin/profile') ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Profile
              </Link>
            </div>
          </nav>
          <div className="p-4 border-t border-gray-100 mt-auto">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 transition"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        </aside>
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>
        )}
        {/* Main Content */}
        <div className="flex-1 md:ml-64 min-h-screen">
          <main className="p-4 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout; 