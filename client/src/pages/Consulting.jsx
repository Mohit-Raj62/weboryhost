import React from 'react';

const Consulting = () => {
  return (
    <div className="consulting-page min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950 relative overflow-x-hidden">
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

        .consulting-page {
          padding: 4rem 2rem;
          max-width: 2200px;
          margin: 0 auto;
          color: white;
          position: relative;
        }

        .consulting-page::before {
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

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
          margin: 4rem auto;
          max-width: 1600px;
          padding: 0 1rem;
        }

        .service-card {
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

        .service-card::before {
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

        .service-card:hover::before {
          left: 100%;
        }

        .service-card:hover {
          transform: translateY(-10px) scale(1.02);
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 
            0 8px 32px -8px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .service-card h3 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #fff;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .service-card p {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.7;
          font-size: 1.1rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .cta-section {
          text-align: center;
          margin: 6rem auto;
          padding: 4rem;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border-radius: 24px;
          max-width: 1000px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 4px 24px -8px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          animation: fadeIn 1s ease-out 0.4s both;
        }

        .cta-section::before {
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

        .cta-section:hover::before {
          left: 100%;
        }

        .cta-section h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: #fff;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .cta-section p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.2rem;
          margin-bottom: 2rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .cta-button {
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

        .cta-button:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 
            0 8px 32px -8px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2);
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
        }

        .cta-button:active {
          transform: translateY(-2px) scale(0.98);
          transition: all 0.1s ease;
        }

        @media (max-width: 768px) {
          .consulting-page {
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
          
          .services-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .service-card {
            padding: 2rem;
          }
          
          .cta-section {
            padding: 2rem;
            margin: 4rem 1rem;
          }
          
          .cta-section h2 {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="hero-section">
        <h1>IT Consulting Services</h1>
        <p>Transform your business with expert IT consulting solutions tailored to your needs</p>
      </div>

      <div className="services-grid">
        <div className="service-card">
          <h3>Strategic Planning</h3>
          <p>Develop comprehensive IT strategies aligned with your business goals and objectives.</p>
        </div>

        <div className="service-card">
          <h3>Technology Assessment</h3>
          <p>Evaluate your current technology stack and identify opportunities for improvement.</p>
        </div>

        <div className="service-card">
          <h3>Digital Transformation</h3>
          <p>Guide your organization through digital transformation initiatives with expert consulting.</p>
        </div>

        <div className="service-card">
          <h3>IT Infrastructure Planning</h3>
          <p>Design and implement scalable IT infrastructure solutions for your business.</p>
        </div>

        <div className="service-card">
          <h3>Security Consulting</h3>
          <p>Enhance your cybersecurity posture with expert security assessments and recommendations.</p>
        </div>

        <div className="service-card">
          <h3>Cloud Strategy</h3>
          <p>Develop and implement cloud migration and optimization strategies.</p>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Transform Your IT Strategy?</h2>
        <p>Contact us today to discuss how our consulting services can help your business grow.</p>
        <a href="/contact" className="cta-button">Get Started</a>
      </div>
    </div>
  );
};

export default Consulting; 