import React from 'react';
import ContactForm from '../components/ContactForm';
import SupportTicketForm from '../components/SupportTicketForm';

const Support = () => {
  return (
    <div className="support-page min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950 relative overflow-x-hidden">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shine {
          from { background-position: 200% center; }
          to { background-position: -200% center; }
        }

        .support-page {
          padding: 4rem 2rem;
          max-width: 2200px;
          margin: 0 auto;
          color: white;
          position: relative;
        }

        .support-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .hero-section {
          text-align: center;
          padding: 6rem 0;
          position: relative;
          animation: fadeIn 1s ease-out;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 150%;
          height: 150%;
          background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-section h1 {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .hero-section p {
          font-size: 1.4rem;
          color: rgba(255, 255, 255, 0.95);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .support-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
          margin: 4rem auto;
          max-width: 1600px;
          padding: 0 1rem;
        }

        .support-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border-radius: 24px;
          padding: 2.5rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 4px 24px -8px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          animation: fadeIn 1s ease-out 0.2s both;
        }

        .support-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: 0.5s;
        }

        .support-card:hover::before {
          left: 100%;
        }

        .support-card:hover {
          transform: translateY(-10px) scale(1.02);
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 
            0 8px 32px -8px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .support-card h3 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #fff;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .support-card p {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.7;
          font-size: 1.1rem;
          margin-bottom: 2rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .contact-form {
          margin: 6rem auto;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border-radius: 24px;
          padding: 3rem;
          max-width: 800px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 4px 24px -8px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          animation: fadeIn 1s ease-out 0.4s both;
        }

        .contact-form::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: 0.5s;
        }

        .contact-form:hover::before {
          left: 100%;
        }

        .contact-form h2 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          color: #fff;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .form-group {
          margin-bottom: 2rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.8rem;
          color: rgba(255, 255, 255, 0.95);
          font-size: 1.1rem;
          font-weight: 500;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          color: black;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(4px);
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
        }

        .form-group textarea {
          min-height: 150px;
          resize: vertical;
        }

        .submit-button {
          display: inline-block;
          padding: 1.2rem 3rem;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          border: none;
          border-radius: 16px;
          font-weight: 600;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 4px 24px -8px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .submit-button:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 
            0 8px 32px -8px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2);
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
        }

        .submit-button:active {
          transform: translateY(-2px) scale(0.98);
          transition: all 0.1s ease;
        }

        .support-hours {
          margin: 6rem auto;
          text-align: center;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border-radius: 24px;
          max-width: 800px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 4px 24px -8px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          animation: fadeIn 1s ease-out 0.6s both;
        }

        .support-hours::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: 0.5s;
        }

        .support-hours:hover::before {
          left: 100%;
        }

        .support-hours h3 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #fff;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .support-hours p {
          color: rgba(255, 255, 255, 0.9);
          margin: 1rem 0;
          font-size: 1.2rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .support-page {
            padding: 2rem 1rem;
          }
          
          .hero-section {
            padding: 4rem 0;
          }
          
          .hero-section h1 {
            font-size: 2.8rem;
          }
          
          .hero-section p {
            font-size: 1.2rem;
          }
          
          .support-options {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .support-card {
            padding: 2rem;
          }
          
          .contact-form {
            padding: 2rem;
            margin: 4rem 1rem;
          }
          
          .contact-form h2 {
            font-size: 2rem;
          }
          
          .support-hours {
            padding: 2rem;
            margin: 4rem 1rem;
          }
          
          .support-hours h3 {
            font-size: 1.8rem;
          }
        }
      `}</style>

      <div className="hero-section">
        <h1>24/7 Technical Support</h1>
        <p>Get expert help whenever you need it. Our support team is always ready to assist you.</p>
      </div>

      <div className="support-options">
        <div className="support-card">
          <h3>Live Chat Support</h3>
          <p>Connect with our support team instantly through our live chat system. Available 24/7 for immediate assistance.</p>
          <button className="submit-button">Start Chat</button>
        </div>

        <div className="support-card">
          <h3>Email Support</h3>
          <p>Send us an email and our team will respond within 24 hours with detailed solutions to your queries.</p>
          <button className="submit-button">Send Email</button>
        </div>

        <div className="support-card">
          <h3>Phone Support</h3>
          <p>Speak directly with our technical experts. Available during business hours for personalized assistance.</p>
          <button className="submit-button">Call Now</button>
        </div>
      </div>

      <div className="contact-form">
        <h2>Submit a Support Ticket</h2>
        <SupportTicketForm />
      </div>

      <div className="support-hours">
        <h3>Support Hours</h3>
        <p>Live Chat: 24/7</p>
        <p>Email Support: 24/7 (Response within 24 hours)</p>
        <p>Phone Support: Monday - Friday, 9:00 AM - 6:00 PM EST</p>
      </div>
    </div>
  );
};

export default Support; 