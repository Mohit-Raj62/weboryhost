import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import FeedbackForm from '../components/FeedbackForm';
import axios from 'axios';
import { handleApiError } from '../config/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('contact'); // 'contact' or 'support'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'medium',
    category: 'general'
  });

  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);

    // Mouse move effect
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData();
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({
          ...prev,
          name: data.fullName || '',
          email: data.email || '',
          phone: data.phone || ''
        }));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch user data. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    let newTicketNumber = '';
    const web3FormsData = {
      ...formData,
      access_key: "7203cedb-c88e-49fd-9559-c83b4426bfcc", // IMPORTANT: Replace with your actual Web3Forms access key
      from_name: "Webory Contact Form",
    };

    if (activeTab === 'support') {
      newTicketNumber = Math.floor(100000 + Math.random() * 900000).toString();
      web3FormsData.ticket_number = newTicketNumber;
      setTicketNumber(newTicketNumber);
    }
    
    web3FormsData.subject = activeTab === 'contact' 
      ? `New Contact from ${formData.name}` 
      : `New Support Ticket #${newTicketNumber} from ${formData.name}`;
    
    // Add tab-specific data
    if (activeTab === 'contact') {
      web3FormsData.form_type = 'Contact Us';
    } else {
      web3FormsData.form_type = 'Support Ticket';
    }

    try {
      const response = await axios.post(
        "https://api.web3forms.com/submit",
        web3FormsData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      const data = response.data;

      if (data.success) {
        let successMessage = data.message || 'Message sent successfully!';
        if (activeTab === 'support') {
          successMessage = `Support ticket created successfully! Your ticket number is ${newTicketNumber}.`;
        }
        setStatus({
          type: 'success',
          message: successMessage
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          priority: 'medium',
          category: 'general'
        });
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'An unknown error occurred.'
        });
        if (activeTab === 'support') {
            setTicketNumber('');
        }
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setStatus({
        type: 'error',
        message: errorMessage
      });
       if (activeTab === 'support') {
        setTicketNumber('');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-x-hidden">
      <Navigation />
      
      {/* Animated Background */} 
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20"></div>
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-500/30 blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x / 20}px`,
            top: `${mousePosition.y / 20}px`,
            transform: 'translate(-50%, -50%)'
          }}
        ></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-pink-400/20 to-red-500/20 blur-3xl animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-3xl animate-pulse delay-1000"></div>
      </div>

      {pageLoading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-400"></div>
        </div>
      ) : (
        <div className="relative z-10 pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                    {error}
                </div>
            )}
            {/* Header Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl lg:text-7xl font-black text-white mb-8">
                Get in Touch
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Have a question or want to work together? We'd love to hear from you.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-full p-1 inline-flex">
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                    activeTab === 'contact'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Contact Us
                </button>
                <button
                  onClick={() => setActiveTab('support')}
                  className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                    activeTab === 'support'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Support Ticket
                </button>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
                  <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white text-xl">
                        📧
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">Email</h3>
                        <p className="text-white/70">weboryinfo@gamil.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white text-xl">
                        📞
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">Phone</h3>
                        <p className="text-white/70">+91 94704-89367</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white text-xl">
                        📍
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">Address</h3>
                        <p className="text-white/70">Webory Street<br />Patna,Bihar City, 800020</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
                  <h2 className="text-3xl font-bold text-white mb-6">Business Hours</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Monday - Friday</span>
                      <span className="text-white font-semibold">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Saturday</span>
                      <span className="text-white font-semibold">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Sunday</span>
                      <span className="text-white font-semibold">Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
                <h2 className="text-3xl font-bold text-white mb-6">
                  {activeTab === 'contact' ? 'Send us a Message' : 'Create Support Ticket'}
                </h2>
                
                {status.message && (
                  <div className={`mb-6 p-4 ${
                    status.type === 'success' ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'
                  } rounded-xl text-${status.type === 'success' ? 'green' : 'red'}-400`}>
                    {status.message}
                  </div>
                )}
                
                {ticketNumber && (
                  <div className="mb-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
                    Your Ticket Number: {ticketNumber}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 mb-2">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                        placeholder="What's this about?"
                      />
                    </div>
                  </div>

                  {activeTab === 'support' && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white/80 mb-2">Priority</label>
                        <select
                          name="priority"
                          value={formData.priority}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/80 mb-2">Category</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                        >
                          <option value="general">General</option>
                          <option value="technical">Technical</option>
                          <option value="billing">Billing</option>
                          <option value="feature">Feature Request</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-white/80 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      activeTab === 'contact' ? 'Send Message' : 'Create Ticket'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
                  <span className="text-sm font-medium text-pink-400">Share Your Experience</span>
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-white mb-8">What Our Clients Say</h2>
                <p className="text-xl lg:text-2xl text-white/80">
                  We value your feedback and would love to hear about your experience with us
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <FeedbackForm />
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Contact; 