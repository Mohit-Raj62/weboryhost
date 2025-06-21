import React, { useState } from 'react';
import SupportTicketForm from '../components/SupportTicketForm';
import GetInTouchForm from '../components/GetInTouchForm';

const ContactForm = ({ 
  serviceType, 
  buttonText = 'Get Started',
  showAdditionalFields = true,
  plan
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    budget: '', 
    timeline: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setResult("Sending....");
    let generatedTicketNumber = "";
    if (serviceType === "support") {
      // Example: SUP-20240608-1234
      const date = new Date();
      const ymd = date.getFullYear().toString() + (date.getMonth()+1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0');
      const rand = Math.floor(1000 + Math.random() * 9000);
      generatedTicketNumber = `SUP-${ymd}-${rand}`;
      setTicketNumber(generatedTicketNumber);
    }
    try {
      // Create FormData from controlled state
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("company", formData.company);
      form.append("message", formData.message);
      form.append("budget", formData.budget);
      form.append("timeline", formData.timeline);
      form.append("access_key", "7203cedb-c88e-49fd-9559-c83b4426bfcc");
      if (serviceType) form.append("serviceType", serviceType);
      if (plan) form.append("plan", plan);
      if (generatedTicketNumber) form.append("ticketNumber", generatedTicketNumber);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        if (generatedTicketNumber) {
          setResult(`Support Ticket Submitted Successfully!\nYour Ticket Number: ${generatedTicketNumber}`);
        } else {
          setResult("Form Submitted Successfully");
        }
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          budget: '',
          timeline: ''
        });
      } else {
        setErrors({ submit: 'Failed to submit form. Please try again.' });
        setResult(data.message || 'Failed to submit form.');
      }
    } catch (error) {
      setErrors({ submit: 'Failed to submit form. Please try again.' });
      setResult('Failed to submit form. Please try again.');
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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* <h1>24/7 Technical Support</h1> */}
      {/* <p>Get expert help whenever you need it. Our support team is always ready to assist you.</p> */}
      {success ? (
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-green-400 mb-2">Thank You!</h3>
          {ticketNumber ? (
            <>
              <p className="text-white/70">Your support ticket has been created.</p>
              <p className="text-white/90 font-bold mt-2">Ticket Number: {ticketNumber}</p>
              <p className="text-white/60 mt-2">Please save this number for future reference.</p>
            </>
          ) : (
            <p className="text-white/70">We'll get back to you shortly.</p>
          )}
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/80 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl bg-white/10 border ${errors.name ? 'border-red-500' : 'border-white/20'} text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300`}
                placeholder="Your name"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-white/80 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl bg-white/10 border ${errors.email ? 'border-red-500' : 'border-white/20'} text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
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
              <label className="block text-white/80 mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                placeholder="Your company name"
              />
            </div>
          </div>

          {showAdditionalFields && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 mb-2">Budget Range</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                >
                  <option value="">Select budget range</option>
                  <option value="1k-5k">$1,000 - $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k+">$25,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-white/80 mb-2">Timeline</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                >
                  <option value="">Select timeline</option>
                  <option value="1-3months">1-3 months</option>
                  <option value="3-6months">3-6 months</option>
                  <option value="6-12months">6-12 months</option>
                  <option value="12+months">12+ months</option>
                </select>
              </div>
            </div>
          )}

          {plan && (
            <div>
              <label className="block text-white/80 mb-2">Selected Plan</label>
              <input
                type="text"
                value={plan}
                readOnly
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
              />
            </div>
          )}

          <div>
            <label className="block text-white/80 mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-3 rounded-xl bg-white/10 border ${errors.message ? 'border-red-500' : 'border-white/20'} text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none`}
              placeholder={`Tell us about your ${serviceType} needs...`}
            ></textarea>
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
          </div>

          {errors.submit && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400">
              {errors.submit}
            </div>
          )}
          {result && (
            <div className="mt-2 text-center text-white/80">
              {result}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            ) : (
              buttonText
            )}
          </button>
        </>
      )}
    </form>
  );
};

export default ContactForm; 