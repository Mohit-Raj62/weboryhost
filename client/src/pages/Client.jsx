import React from 'react';

const Client = () => {
  const clients = [
    {
      name: "TechCorp Solutions",
      logo: "🏢",
      industry: "Technology",
      testimonial: "Webory transformed our digital presence with their innovative solutions. Their team's expertise and dedication are unmatched.",
      project: "Enterprise Software Development"
    },
    {
      name: "GreenLife Foods",
      logo: "🌱",
      industry: "Food & Beverage",
      testimonial: "The e-commerce platform developed by Webory has significantly increased our online sales and customer engagement.",
      project: "E-commerce Platform"
    },
    {
      name: "Global Finance",
      logo: "💼",
      industry: "Finance",
      testimonial: "Their secure and scalable solutions have helped us streamline our operations and improve customer satisfaction.",
      project: "Financial Management System"
    },
    {
      name: "HealthPlus",
      logo: "🏥",
      industry: "Healthcare",
      testimonial: "Webory's healthcare management system has revolutionized how we handle patient data and appointments.",
      project: "Healthcare Management System"
    }
  ];

  return (
    <div className="client-page min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950 relative overflow-x-hidden">
      <style>{`
        .client-page {
          padding: 4rem 2rem;
          max-width: 2200px;
          margin: 0 auto;
          color: white;
          position: relative;
        }

        .client-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .hero-section {
          text-align: center;
          padding: 6rem 0;
          position: relative;
        }

        .hero-section h1 {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }

        .hero-section p {
          font-size: 1.4rem;
          color: rgba(255, 255, 255, 0.9);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .clients-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2.5rem;
          margin-top: 4rem;
          padding: 0 1rem;
        }

        .client-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 2.5rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 24px -8px rgba(0, 0, 0, 0.2);
        }

        .client-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 8px 32px -8px rgba(0, 0, 0, 0.3);
        }

        .client-header {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
        }

        .client-logo {
          font-size: 3rem;
          margin-right: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .client-info h3 {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0;
          color: #fff;
          letter-spacing: -0.01em;
        }

        .client-info p {
          margin: 0.4rem 0 0;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
        }

        .client-testimonial {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.8;
          margin-bottom: 2rem;
          font-style: italic;
          font-size: 1.1rem;
          position: relative;
          padding: 0 1rem;
        }

        .client-testimonial::before,
        .client-testimonial::after {
          content: '"';
          font-size: 2rem;
          color: rgba(255, 255, 255, 0.3);
          position: absolute;
        }

        .client-testimonial::before {
          left: -0.5rem;
          top: -0.5rem;
        }

        .client-testimonial::after {
          right: -0.5rem;
          bottom: -1rem;
        }

        .client-project {
          background: rgba(255, 255, 255, 0.06);
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .client-project h4 {
          margin: 0 0 0.8rem;
          color: #fff;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .client-project p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
        }

        .stats-section {
          margin-top: 6rem;
          text-align: center;
          padding: 0 1rem;
        }

        .stats-section h2 {
          font-size: 2.5rem;
          margin-bottom: 3rem;
          background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2.5rem;
          margin-top: 3rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.08);
          padding: 2.5rem;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.12);
        }

        .stat-card h3 {
          font-size: 3rem;
          font-weight: 800;
          margin: 0;
          color: #fff;
          background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stat-card p {
          margin: 1rem 0 0;
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.2rem;
        }

        .cta-section {
          text-align: center;
          margin-top: 6rem;
          padding: 4rem;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
        }

        .cta-section h2 {
          font-size: 2.8rem;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cta-section p {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.9);
          max-width: 600px;
          margin: 0 auto 2.5rem;
        }

        .cta-button {
          display: inline-block;
          padding: 1.2rem 3rem;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 24px -8px rgba(0, 0, 0, 0.2);
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 32px -8px rgba(0, 0, 0, 0.3);
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
        }

        @media (max-width: 768px) {
          .client-page {
            padding: 2rem 1rem;
          }
          
          .hero-section h1 {
            font-size: 2.5rem;
          }
          
          .hero-section p {
            font-size: 1.1rem;
          }
          
          .clients-grid {
            grid-template-columns: 1fr;
          }
          
          .cta-section {
            padding: 2rem;
          }
          
          .cta-section h2 {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="hero-section">
        <h1>Our Clients</h1>
        <p>Discover how we've helped businesses transform their digital presence</p>
      </div>

      <div className="clients-grid">
        {clients.map((client, index) => (
          <div key={index} className="client-card">
            <div className="client-header">
              <div className="client-logo">{client.logo}</div>
              <div className="client-info">
                <h3>{client.name}</h3>
                <p>{client.industry}</p>
              </div>
            </div>
            <p className="client-testimonial">"{client.testimonial}"</p>
            <div className="client-project">
              <h4>Project</h4>
              <p>{client.project}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="stats-section">
        <h2>Our Impact</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>500+</h3>
            <p>Happy Clients</p>
          </div>
          <div className="stat-card">
            <h3>1000+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="stat-card">
            <h3>98%</h3>
            <p>Client Satisfaction</p>
          </div>
          <div className="stat-card">
            <h3>15+</h3>
            <p>Years Experience</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Transform Your Business?</h2>
        <p>Join our growing list of satisfied clients and take your business to the next level.</p>
        <a href="/contact" className="cta-button">Get Started</a>
      </div>
    </div>
  );
};

export default Client; 