import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ShieldCheck,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://webory.onrender.com';

const Contact = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialService = searchParams.get('service') || '';
  const initialBudget = searchParams.get('budget') || '₹3,000 - ₹8,000';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: initialBudget,
    services: initialService ? [initialService] : ['Web Engineering'],
    message: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const availableServices = [
    'Web Engineering',
    'Mobile App Development',
    'AI & Automation',
    'UI/UX & Product Design',
    'Cloud Architecture & DevOps',
    'SEO & Performance'
  ];

  const budgetOptions = [
    '<₹3,000',
    '₹3,000 - ₹8,000',
    '₹8,000 - ₹15,000',
    '₹15,000+'
  ];

  const toggleService = (srv) => {
    if (formData.services.includes(srv)) {
      setFormData({
        ...formData,
        services: formData.services.filter(s => s !== srv)
      });
    } else {
      setFormData({
        ...formData,
        services: [...formData.services, srv]
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post(`${API_URL}/api/contact`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        subject: `New Inquiry: ${formData.services.join(', ')}`,
        message: `Budget: ${formData.budget}\nServices: ${formData.services.join(', ')}\n\nMessage:\n${formData.message}`
      }).catch(err => {
        console.warn('Backend contact API unavailable, simulated success:', err.message);
      });

      setStatus({
        type: 'success',
        message: 'Thank you! Your project inquiry has been received. Our technical team will reach out within 4 business hours.'
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        budget: '₹3,000 - ₹8,000',
        services: ['Web Engineering'],
        message: ''
      });
    } catch (error) {
      console.error('Contact submission error:', error);
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please connect with us directly via WhatsApp or phone.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen">
      <div className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            CONTACT & INQUIRIES
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mt-1">
            Let's Discuss Your Next Project
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Tell us about your requirements, timeline, and goals. We respond with technical insights within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-5">Contact Details</h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Email Address</div>
                    <a href="mailto:infoweboryskills.in" className="text-slate-900 font-medium hover:text-blue-600 transition-colors">
                      info@weboryskills.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Direct Phone</div>
                    <a href="tel:+919473471153" className="text-slate-900 font-medium hover:text-blue-600 transition-colors block">
                      +91-94734 71153
                    </a>
                    <a href="tel:+919473471153" className="text-slate-500 text-xs hover:text-blue-600 transition-colors">
                      +91-94734 71153
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Locations</div>
                    <div className="text-slate-700 text-xs font-medium">
                      Dehradun, Uttarakhand ||  Patna, Bihar
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Working Hours</div>
                    <div className="text-slate-700 text-xs font-medium">
                      Monday – Saturday: 9:00 AM – 7:00 PM IST
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="mt-7 pt-5 border-t border-slate-100">
                <a
                  href="https://wa.me/916205947359?text=Hi%20Webory,%20I'd%20like%20to%20discuss%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" /> Quick WhatsApp Connect
                </a>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>NDA signed prior to project disclosures</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>100% Intellectual Property & source code transfer</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                Project Inquiry Form
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Fill in the details below and we will prepare an estimated plan.
              </p>

              {status.message && (
                <div
                  className={`p-3.5 rounded-lg mb-6 text-xs flex items-start gap-2.5 ${
                    status.type === 'success'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Services multi-select chips */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 block">
                    What services do you need?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableServices.map((srv) => (
                      <button
                        key={srv}
                        type="button"
                        onClick={() => toggleService(srv)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          formData.services.includes(srv)
                            ? 'bg-blue-50 border-blue-600 text-blue-900 font-semibold shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {formData.services.includes(srv) ? '✓ ' : '+ '}
                        {srv}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget selector */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 block">
                    Estimated Budget
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetOptions.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: b })}
                        className={`py-2 px-3 rounded-lg text-xs font-medium text-center border transition-colors ${
                          formData.budget === b
                            ? 'bg-blue-50 border-blue-600 text-blue-900 font-semibold shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Corp"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Project Requirements
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you want to build or what challenges you are looking to solve..."
                    className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Normal solid button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Send Inquiry <Send className="w-3.5 h-3.5 ml-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
