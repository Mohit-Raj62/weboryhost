import React from 'react';
import ContactForm from '../components/ContactForm';

const Maintenance = () => {
  return (
    <div className="maintenance-page min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950 relative overflow-x-hidden">
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

        .maintenance-page {
          padding: 4rem 2rem;
          max-width: 2200px;
          margin: 0 auto;
          color: white;
          position: relative;
        }

        .maintenance-page::before {
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

        .maintenance-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
          margin: 4rem auto;
          max-width: 1600px;
          padding: 0 1rem;
        }

        .feature-card {
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

        .feature-card::before {
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

        .feature-card:hover::before {
          left: 100%;
        }

        .feature-card:hover {
          transform: translateY(-10px) scale(1.02);
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 
            0 8px 32px -8px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .feature-card h3 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #fff;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .feature-card p {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.7;
          font-size: 1.1rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .maintenance-plans {
          margin: 6rem auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
          max-width: 1600px;
          padding: 0 1rem;
        }

        .plan-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border-radius: 24px;
          padding: 3rem;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 4px 24px -8px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          animation: fadeIn 1s ease-out 0.4s both;
        }

        .plan-card::before {
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

        .plan-card:hover::before {
          left: 100%;
        }

        .plan-card:hover {
          transform: translateY(-10px) scale(1.02);
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 
            0 8px 32px -8px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .plan-card h3 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #fff;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .plan-price {
          font-size: 3rem;
          color: #fff;
          margin: 1.5rem 0;
          font-weight: 800;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .plan-features {
          list-style: none;
          padding: 0;
          margin: 2.5rem 0;
        }

        .plan-features li {
          color: rgba(255, 255, 255, 0.9);
          margin: 1rem 0;
          font-size: 1.1rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .plan-button {
          display: inline-block;
          padding: 1.2rem 3rem;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          text-decoration: none;
          border-radius: 16px;
          font-weight: 600;
          font-size: 1.2rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 4px 24px -8px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .plan-button:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 
            0 8px 32px -8px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2);
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
        }

        .plan-button:active {
          transform: translateY(-2px) scale(0.98);
          transition: all 0.1s ease;
        }

        @media (max-width: 768px) {
          .maintenance-page {
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
          
          .maintenance-features,
          .maintenance-plans {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .feature-card,
          .plan-card {
            padding: 2rem;
          }
        }
      `}</style>

      <div className="hero-section">
        <h1>IT Maintenance Services</h1>
        <p>Keep your systems running smoothly with our comprehensive maintenance solutions</p>
      </div>

      <div className="maintenance-features">
        <div className="feature-card">
          <h3>24/7 Monitoring</h3>
          <p>Round-the-clock system monitoring to detect and prevent issues before they impact your business.</p>
        </div>

        <div className="feature-card">
          <h3>Regular Updates</h3>
          <p>Automated system updates and patches to ensure optimal performance and security.</p>
        </div>

        <div className="feature-card">
          <h3>Performance Optimization</h3>
          <p>Continuous system optimization to maintain peak performance and efficiency.</p>
        </div>

        <div className="feature-card">
          <h3>Backup Solutions</h3>
          <p>Regular automated backups to protect your valuable data and ensure business continuity.</p>
        </div>
      </div>

      <div className="maintenance-plans">
        <div className="plan-card">
          <h3>Basic Plan</h3>
          <div className="plan-price">$299/mo</div>
          <ul className="plan-features">
            <li>24/7 System Monitoring</li>
            <li>Weekly Updates</li>
            <li>Monthly Performance Review</li>
            <li>Email Support</li>
          </ul>
          <a href="/contact" className="plan-button">Get Started</a>
        </div>

        <div className="plan-card">
          <h3>Professional Plan</h3>
          <div className="plan-price">$599/mo</div>
          <ul className="plan-features">
            <li>Everything in Basic</li>
            <li>Daily Updates</li>
            <li>Weekly Performance Review</li>
            <li>Priority Support</li>
            <li>Backup Management</li>
          </ul>
          <a href="/contact" className="plan-button">Get Started</a>
        </div>

        <div className="plan-card">
          <h3>Enterprise Plan</h3>
          <div className="plan-price">Custom</div>
          <ul className="plan-features">
            <li>Everything in Professional</li>
            <li>Real-time Updates</li>
            <li>Dedicated Support Team</li>
            <li>Custom Solutions</li>
            <li>24/7 Phone Support</li>
          </ul>
          <a href="/contact" className="plan-button">Contact Us</a>
        </div>
      </div>

      <div className="max-w-2xl mx-auto my-16">
        <ContactForm serviceType="it maintenance" buttonText="Get Started" />
      </div>
    </div>
  );
};

export default Maintenance; 