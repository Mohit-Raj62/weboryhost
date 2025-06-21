import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: 'Web Development',
      description: 'Custom website development tailored to your business needs. From simple landing pages to complex web applications.',
      icon: '🌐',
      link: '/consulting'
    },
    {
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android devices.',
      icon: '📱',
      link: '/consulting'
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design solutions that enhance user experience and drive engagement.',
      icon: '🎨',
      link: '/consulting'
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services for your business.',
      icon: '☁️',
      link: '/consulting'
    },
    {
      title: 'Maintenance & Support',
      description: 'Regular maintenance and 24/7 technical support for your digital assets.',
      icon: '🔧',
      link: '/maintenance'
    },
    {
      title: 'Technical Support',
      description: 'Expert technical support and troubleshooting for all your IT needs.',
      icon: '💻',
      link: '/support'
    }
  ];

  return (
    <div className="services-page ">
      <style>{`
        .services-page {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          color: white;
        }

        .services-header {
          text-align: center;
          padding: 2rem 0;
        }

        .services-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #fff 0%, #e0e0e0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .services-header p {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
          margin: 0 auto;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .service-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 2rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          color: white;
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .service-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .service-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: white;
        }

        .service-description {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
        }

        .cta-section {
          text-align: center;
          margin-top: 4rem;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
        }

        .cta-section h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: white;
        }

        .cta-section p {
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-button {
          display: inline-block;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          transition: transform 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="services-header">
        <h1>Our Services</h1>
        <p>Discover our comprehensive range of digital solutions designed to help your business thrive in the digital age.</p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <Link to={service.link} key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h2 className="service-title">{service.title}</h2>
            <p className="service-description">{service.description}</p>
          </Link>
        ))}
      </div>

      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Contact us today to discuss how we can help transform your business with our expert services.</p>
        <Link to="/contact" className="cta-button">Contact Us</Link>
      </div>
    </div>
  );
};

export default Services; 