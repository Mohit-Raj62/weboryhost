import React from 'react';

const About = () => {
  const team = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: "👨‍💼",
      bio: "Visionary leader with 15+ years of experience in technology and business development."
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      image: "👩‍💻",
      bio: "Tech innovator specializing in scalable architecture and emerging technologies."
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      image: "👨‍💻",
      bio: "Full-stack expert passionate about creating efficient and elegant solutions."
    },
    {
      name: "Emily Davis",
      role: "Creative Director",
      image: "👩‍🎨",
      bio: "Award-winning designer focused on creating exceptional user experiences."
    },{
      name: "Emily Davis",
      role: "Creative Director",
      image: "👩‍🎨",
      bio: "Award-winning designer focused on creating exceptional user experiences."
    },{
      name: "Emily Davis",
      role: "Creative Director",
      image: "👩‍🎨",
      bio: "Award-winning designer focused on creating exceptional user experiences."
    }
  ];

  return (
    <div className="about-page min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950 relative overflow-x-hidden">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        // @keyframes pulse {
        //   0% { transform: scale(1); }
        //   50% { transform: scale(1.05); }
        //   100% { transform: scale(1); }
        // }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 2; transform: translateY(0); }
        }

        @keyframes shine {
          from { background-position: 200% center; }
          to { background-position: -200% center; }
        }

        @keyframes glow {
          0% { box-shadow: 0 0 5px rgba(255,255,255,0.1); }
          50% { box-shadow: 0 0 20px rgba(255,255,255,0.2); }
          100% { box-shadow: 0 0 5px rgba(255,255,255,0.1); }
        }

        .about-page {
          padding: 4rem 2rem;
          max-width: 2200px;
          margin: 0 auto;
          color: white;
          position: relative;
        }

        .about-page::before {
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
          animation: pulse 8s ease-in-out infinite;
        }

        .hero-section {
          text-align: center;
          padding: 8rem 0;
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
          animation: pulse 4s ease-in-out infinite;
        }

        .hero-section h1 {
          font-size: 4.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .hero-section p {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.95);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .mission-section {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border-radius: 30px;
          padding: 5rem;
          margin: 6rem auto;
          text-align: center;
          max-width: 1000px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 4px 24px -8px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          transform: translateY(0);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeIn 1s ease-out 0.2s both;
        }

        .mission-section:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 8px 32px -8px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .mission-section h2 {
          font-size: 3rem;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .mission-section p {
          color: rgba(255, 255, 255, 0.95);
          line-height: 1.8;
          max-width: 800px;
          margin: 0 auto;
          font-size: 1.3rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .values-section {
          margin: 8rem 0;
          padding: 0 1rem;
          animation: fadeIn 1s ease-out 0.4s both;
        }

        .values-section h2 {
          text-align: center;
          font-size: 3rem;
          margin-bottom: 4rem;
          background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
          margin-top: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .value-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border-radius: 24px;
          padding: 3rem;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 4px 24px -8px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          animation: fadeIn 1s ease-out 0.6s both;
        }

        .value-card:hover {
          transform: translateY(-10px) scale(1.02);
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 
            0 8px 32px -8px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .value-card h3 {
          font-size: 2rem;
          margin: 1.5rem 0;
          color: #fff;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .value-card p {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.7;
          font-size: 1.2rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .team-section {
          margin: 8rem 0;
          padding: 0 1rem;
          animation: fadeIn 1s ease-out 0.8s both;
        }

        .team-section h2 {
          text-align: center;
          font-size: 3rem;
          margin-bottom: 4rem;
          background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 3rem;
          margin-top: 2rem;
          max-width: 1600px;
          margin: 0 auto;
        }

        .team-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border-radius: 24px;
          padding: 3rem;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 4px 24px -8px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fadeIn 1s ease-out 1s both;
        }

        .team-card:hover {
          transform: translateY(-10px) scale(1.02);
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 
            0 8px 32px -8px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .team-image {
          font-size: 5rem;
          margin-bottom: 2rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .team-card h3 {
          font-size: 2rem;
          margin: 0.5rem 0;
          color: #fff;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .team-card h4 {
          font-size: 1.3rem;
          margin: 0.5rem 0;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .team-card p {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.7;
          margin-top: 1.5rem;
          font-size: 1.2rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .cta-section {
          text-align: center;
          margin: 8rem auto;
          padding: 5rem;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          max-width: 1000px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          box-shadow: 
            0 4px 24px -8px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          animation: fadeIn 1s ease-out 1.2s both;
        }

        .cta-section:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 8px 32px -8px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .cta-section h2 {
          font-size: 3.2rem;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .cta-section p {
          font-size: 1.4rem;
          color: rgba(255, 255, 255, 0.95);
          max-width: 600px;
          margin: 0 auto 3rem;
          line-height: 1.7;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .cta-button {
          display: inline-block;
          padding: 1.4rem 3.5rem;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          text-decoration: none;
          border-radius: 16px;
          font-weight: 600;
          font-size: 1.3rem;
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

        @media (max-width: 768px) {
          .about-page {
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
          
          .mission-section,
          .cta-section {
            padding: 3rem 2rem;
            margin: 4rem auto;
          }
          
          .values-grid,
          .team-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .team-card,
          .value-card {
            padding: 2.5rem;
          }

          .team-image {
            font-size: 4rem;
            padding: 1.5rem;
          }
        }

        .value-card, .team-card, .mission-section, .cta-section {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .value-card::before, .team-card::before, .mission-section::before, .cta-section::before {
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

        .value-card:hover::before, .team-card:hover::before, 
        .mission-section:hover::before, .cta-section:hover::before {
          left: 100%;
        }

        .value-card, .team-card {
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .value-card:hover, .team-card:hover {
          transform: translateY(-10px) scale(1.02) rotateX(2deg) rotateY(2deg);
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 
            0 8px 32px -8px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2),
            0 0 20px rgba(255, 255, 255, 0.1);
          animation: glow 2s infinite;
        }

        .value-card:active, .team-card:active {
          transform: translateY(-5px) scale(0.98);
          transition: all 0.1s ease;
        }

        .team-image {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .team-card:hover .team-image {
          transform: scale(1.1) translateZ(20px);
          animation: float 6s ease-in-out infinite;
        }

        .team-card:hover h3 {
          transform: translateZ(30px);
          text-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .team-card:hover h4 {
          transform: translateZ(20px);
        }

        .team-card:hover p {
          transform: translateZ(10px);
        }

        .value-card:hover h3 {
          transform: translateZ(30px);
          text-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .value-card:hover p {
          transform: translateZ(20px);
        }

        .cta-button {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: 0.5s;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 
            0 8px 32px -8px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2),
            0 0 20px rgba(255, 255, 255, 0.1);
          animation: glow 2s infinite;
        }

        .cta-button:active {
          transform: translateY(-2px) scale(0.98);
          transition: all 0.1s ease;
        }

        .mission-section:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 8px 32px -8px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2),
            0 0 20px rgba(255, 255, 255, 0.1);
          animation: glow 2s infinite;
        }

        .mission-section:active {
          transform: translateY(-2px);
          transition: all 0.1s ease;
        }

        @media (hover: none) {
          .value-card:hover, .team-card:hover, 
          .mission-section:hover, .cta-section:hover {
            transform: none;
            animation: none;
          }

          .value-card:active, .team-card:active {
            transform: scale(0.98);
            transition: all 0.1s ease;
          }

          .cta-button:active {
            transform: scale(0.98);
            transition: all 0.1s ease;
          }
        }
      `}</style>

      <div className="hero-section">
        <h1>About Webory</h1>
        <p>Transforming ideas into digital excellence since 2008</p>
      </div>

      <div className="mission-section">
        <h2>Our Mission</h2>
        <p>
          At Webory, we're dedicated to empowering businesses through innovative technology solutions. 
          We believe in creating digital experiences that not only meet but exceed expectations, 
          helping our clients achieve their goals in the digital landscape.
        </p>
      </div>

      <div className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Innovation</h3>
            <p>Constantly pushing boundaries to deliver cutting-edge solutions that drive growth and success.</p>
          </div>
          <div className="value-card">
            <h3>Excellence</h3>
            <p>Committed to delivering the highest quality in every project, no matter the size or scope.</p>
          </div>
          <div className="value-card">
            <h3>Integrity</h3>
            <p>Building trust through transparent communication and honest business practices.</p>
          </div>
          <div className="value-card">
            <h3>Collaboration</h3>
            <p>Working together with clients and team members to achieve exceptional results.</p>
          </div>
        </div>
      </div>

      <div className="team-section">
        <h2>Our Team</h2>
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-image">{member.image}</div>
              <h3>{member.name}</h3>
              <h4>{member.role}</h4>
              <p>{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-section">
        <h2>Join Us on Our Journey</h2>
        <p>Let's create something amazing together. Get in touch to discuss your next project.</p>
        <a href="/contact" className="cta-button">Contact Us</a>
      </div>
    </div>
  );
};

export default About; 