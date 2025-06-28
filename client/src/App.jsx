import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LiveChat from './components/LiveChat';
import Home from './pages/Home';
import About from './pages/About';
import Consulting from './pages/Consulting';
import Maintenance from './pages/Maintenance';
import Support from './pages/Support';
import Client from './pages/Client';
import Services from './pages/Services';
import Contact from './pages/Contact';
import WebDesign from './pages/WebDesign';
import WebDevelopment from './pages/WebDevelopment';
import AppDevelopment from './pages/AppDevelopment';
import SEO from './pages/SEO';
import MLM from './pages/MLM';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import Blog from './pages/Blog';
import Career from './pages/Careers';
import Login from './pages/Login';
import Register from './pages/Register';
import GetStarted from './pages/GetStarted';
import TestPage from './pages/TestPage';

// Admin Components
import AdminLogin from './pages/admin/AdminLogin';
import AdminSignup from './pages/admin/AdminSignup';
import AdminLayout from './components/admin/AdminLayout';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminPosts from './pages/admin/AdminPosts';
import AdminComments from './pages/admin/AdminComments';
import AdminRoles from './pages/admin/AdminRoles';

const App = () => {
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#2196F3',
      },
      secondary: {
        main: '#21CBF3',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/client" element={<Client />} />
          <Route path="/web-design" element={<WebDesign />} />
          <Route path="/web-development" element={<WebDevelopment />} />
          <Route path="/app-development" element={<AppDevelopment />} />
          <Route path="/seo" element={<SEO />} />
          <Route path="/mlm" element={<MLM />} />
          <Route path="/consulting" element={<Consulting />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/career" element={<Career />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/test-page" element={<TestPage />} />

              {/* Admin Authentication Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/signup" element={<AdminSignup />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="roles" element={<AdminRoles />} />
                <Route path="posts" element={<AdminPosts />} />
                <Route path="comments" element={<AdminComments />} />
              </Route>

              {/* Catch all route - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <LiveChat />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

