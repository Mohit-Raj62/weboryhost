import React, { useState } from 'react';
import { API_BASE_URL } from '../config/api';

const ContactForm = ({ 
  serviceType, 
  buttonText = 'Get Started',
  showAdditionalFields = true,
  plan,
  subject,
  fromName
}) => {
  
  // Plan price mapping
  const planPrices = {
    'Basic Plan': '$99',
    'Standard Plan': '$299',
    'Premium Plan': '$599',
    'Enterprise Plan': '$1299',
    'Starter': '$149',
    'Professional': '$499',
    'Business': '$999',
    'Custom': 'Contact for pricing',
    // Add more plan mappings as needed
  };
  
  // Get price based on selected plan
  const getPlanPrice = (planName) => {
    return planPrices[planName] || 'Contact for pricing';
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
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
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be exactly 10 digits';
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendUserConfirmationEmail = async (userData) => {
    try {
      // Create confirmation email for user
      const userEmailForm = new FormData();
      userEmailForm.append("access_key", "7203cedb-c88e-49fd-9559-c83b4426bfcc");
      userEmailForm.append("from_name", "Webory");
      userEmailForm.append("from_email", "noreply@webory.com");
      userEmailForm.append("to_email", userData.email);
      userEmailForm.append("subject", "Inquiry Confirmation - We've Received Your Request");
      
      // Create detailed email content
      const emailContent = `
Dear ${userData.name},

Thank you for your inquiry! We have successfully received your request and our team will review it shortly.

📋 INQUIRY DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Contact Information:
   • Name: ${userData.name}
   • Email: ${userData.email}
   • Phone: ${userData.phone}
   ${userData.company ? `• Company: ${userData.company}` : ''}

📦 Service Details:
   • Service Type: ${serviceType || 'General Inquiry'}
   ${plan ? `• Selected Plan: ${plan}` : ''}
   ${plan ? `• Plan Price: ${getPlanPrice(plan)}` : ''}
   ${userData.timeline ? `• Timeline: ${userData.timeline}` : ''}

💬 Your Message:
   "${userData.message}"

${userData.ticketNumber ? `🎫 Support Ticket Number: ${userData.ticketNumber}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 WHAT'S NEXT?

✅ Our expert team will review your requirements
✅ We'll prepare a detailed proposal/solution
✅ You can expect to hear from us within 24 hours
✅ We'll contact you via email or phone to discuss next steps

📞 Need immediate assistance? 
   • Email: supporrtwebory@gmail.com
   • Phone: +91 94734-71153
   • Website: https://webory.netlify.app

Thank you for choosing us! We're excited to work with you.

Best regards,
The Support Team
Webory

---
This is an automated confirmation email. Please do not reply to this message.
      `;
      
      userEmailForm.append("message", emailContent);
      
      // Send confirmation email to user
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: userEmailForm
      });
      
    } catch (error) {
      console.log("Failed to send confirmation email to user:", error);
    }
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
    let web3Success = false;
    let dbSuccess = false;
    try {
      // Create FormData from controlled state for admin email
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("company", formData.company);
      form.append("message", formData.message);
      form.append("timeline", formData.timeline);
      form.append("access_key", "7203cedb-c88e-49fd-9559-c83b4426bfcc");
      if (serviceType) form.append("serviceType", serviceType);
      if (plan) form.append("plan", plan);
      if (plan) form.append("planPrice", getPlanPrice(plan));
      if (generatedTicketNumber) form.append("ticketNumber", generatedTicketNumber);
      if (subject) form.append("subject", subject || `New ${serviceType} Inquiry from ${formData.name}`);
      if (fromName) form.append("from_name", fromName);

      // Send admin notification email
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form
      });
      const data = await response.json();
      if (data.success) {
        web3Success = true;
        
        // Send confirmation email to user
        await sendUserConfirmationEmail({
          ...formData,
          ticketNumber: generatedTicketNumber
        });
      }
      // Send to backend
      const dbPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        selectedPlan: plan,
      };
      try {
        if (serviceType === 'web development') {
          const dbRes = await fetch(`${API_BASE_URL}/api/webdev-inquiries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dbPayload),
          });
          const dbData = await dbRes.json();
          if (dbData.success) dbSuccess = true;
        } else {
          const dbRes = await fetch(`${API_BASE_URL}/api/quotes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dbPayload),
          });
          const dbData = await dbRes.json();
          if (dbData.success) dbSuccess = true;
        }
      } catch (dbErr) {
        // Ignore DB error for now
      }
      if (web3Success || dbSuccess) {
        setSuccess(true);
        if (generatedTicketNumber) {
          setResult(`✅ Inquiry Submitted Successfully!\n📧 Confirmation email sent to ${formData.email}\n🎫 Your Ticket Number: ${generatedTicketNumber}`);
        } else {
          setResult(`✅ Form Submitted Successfully!\n📧 Confirmation email sent to ${formData.email}`);
        }
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
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
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center animate-fade-in">
          <div className="flex flex-col items-center justify-center mb-4">
            {/* Animated Checkmark */}
            <svg className="h-16 w-16 text-green-400 animate-bounce-in" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="22" stroke="currentColor" strokeOpacity="0.2" strokeWidth="4" fill="none" />
              <path d="M14 26l7 7 13-13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {/* Confetti */}
            <div className="confetti-container">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`confetti confetti-${i % 5}`}></div>
              ))}
            </div>
          </div>
          <h3 className="text-xl font-semibold text-green-400 mb-2 animate-fade-in">Thank You!</h3>
          {ticketNumber ? (
            <>
              <p className="text-white/70">Your support ticket has been created.</p>
              <p className="text-white/90 font-bold mt-2">Ticket Number: {ticketNumber}</p>
              <p className="text-white/60 mt-2">📧 Confirmation email sent to your inbox!</p>
              <p className="text-white/60">Please save this number for future reference.</p>
            </>
          ) : (
            <>
              <p className="text-white/70">We'll get back to you shortly.</p>
              <p className="text-white/60 mt-2">📧 Confirmation email sent to your inbox!</p>
            </>
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
                placeholder="Enter 10 digit phone number"
                required
                maxLength={10}
                pattern="\d{10}"
              />
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
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
              {/* Plan Price Display - Shows price based on selected plan */}
              {plan && (
                <div>
                  <label className="block text-white/80 mb-2">Plan Price</label>
                  <input
                    type="text"
                    value={getPlanPrice(plan)}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  />
                </div>
              )}
             <div>
                <label className="block text-white/80 mb-2">Timeline</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-black focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
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
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
        @keyframes bounceIn {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          80% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in { animation: bounceIn 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards; }
        .confetti-container {
          position: relative;
          width: 100%;
          height: 0;
          pointer-events: none;
        }
        .confetti {
          position: absolute;
          top: 0;
          left: 50%;
          width: 8px;
          height: 16px;
          border-radius: 2px;
          opacity: 0.7;
          animation: confetti-fall 1.2s ease-out forwards;
        }
        .confetti-0 { background: #34d399; transform: translateX(-80px) rotate(-15deg); }
        .confetti-1 { background: #fbbf24; transform: translateX(-40px) rotate(10deg); }
        .confetti-2 { background: #60a5fa; transform: translateX(0px) rotate(-5deg); }
        .confetti-3 { background: #f472b6; transform: translateX(40px) rotate(20deg); }
        .confetti-4 { background: #a78bfa; transform: translateX(80px) rotate(-10deg); }
        @keyframes confetti-fall {
          0% { top: 0; opacity: 1; }
          80% { opacity: 1; }
          100% { top: 60px; opacity: 0; }
        }
      `}</style>
    </form>
  );
};

export default ContactForm;