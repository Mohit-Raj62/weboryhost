import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Users, Target, Award, Zap, Contact } from 'lucide-react';

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const team = [
    {
      name: "Mohit Sinha",
      role: "CEO, Founder & CTO",
      image: "👨‍💼",
      bio: "Visionary leader, founder, and CTO driving innovation, strategy, and scalable tech solutions—melding forward-thinking vision with hands-on technical depth to steer transformative roadmaps and high-performing teams.",
      skills: ["Leadership", "Strategy", "Tech Architecture"],
      social: { email: "singm2698@gmail.com", phone: "+91-62059 47359" }
    },
    {
      name: "Utkarsh Vats",
      role: "Co-Founder, CMO & COO",
      image: "👨‍💻",
      bio: "Co-Founder driving brand growth, marketing strategy, and operational excellence with proven track record in scaling businesses.",
      skills: ["Marketing", "Operations", "Business Development" , "Social Media", "Leadership"],
      social: { email: "utkarshvats3434@gmail.com", phone: "+91-94316 15128" , Instagram: "https://www.instagram.com/utkarshvats_/"}
    },
    {
      name: "Saloni Singh",
      role: "HR, SMM & Creative Director",
      image: "👩‍🎨",
      bio: "People-focused HR expert, growth-driven social media strategist, and visionary creative lead crafting impactful brand experiences.",
      skills: ["Creative Design", "HR Management", "Social Media"],
      social: { email: "salonisingh17781@gmail.com", phone: "+91-9142812872" }
    },
    {
      name: "Piyush Aryan",
      role: "Lead Developer, Marketing Head, Content Writer",
      image: "👨‍💻",
      bio: "strategic marketing head, and creative content writer driving technical innovation and brand visibility.",
      skills: [ "Content Strategy", "Digital Marketing", "Social Media", "Content Writing" ],
      social: { email: "thepiyusharyan@gmail.com", phone: "+91-7992421732" }
    },
    {
      name: "Rupesh Singh",
      role: "SMM Head, PR Head & Product Manager",
      image: "👨‍💻",
      bio: "Digital-first social media expert, reputation-focused PR lead, and product manager turning innovative ideas into user-centric solutions.",
      skills: ["Product Management", "Public Relations", "Social Media Strategy"],
      social: { email: "rupesh.jbit@gmail.com", phone: "+91-7667959622" }
    }
  ];

  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "50+", label: "Happy Clients" },
    { icon: <Target className="w-8 h-8" />, number: "100+", label: "Projects Completed" },
    { icon: <Award className="w-8 h-8" />, number: "2+", label: "Years Experience" },
    { icon: <Zap className="w-8 h-8" />, number: "24/7", label: "Support Available" }
  ];

  const values = [
    {
      title: "Innovation",
      description: "Constantly pushing boundaries to deliver cutting-edge solutions that drive growth and success.",
      icon: "🚀"
    },
    {
      title: "Excellence",
      description: "Committed to delivering the highest quality in every project, no matter the size or scope.",
      icon: "⭐"
    },
    {
      title: "Integrity",
      description: "Building trust through transparent communication and honest business practices.",
      icon: "🤝"
    },
    {
      title: "Collaboration",
      description: "Working together with clients and team members to achieve exceptional results.",
      icon: "👥"
    }
  ];

  // const handleContactUs = () => {
  //   window.location.href = 'mailto:contact@webory.com?subject=Project Inquiry&body=Hi there! I would like to discuss a project with you.';
  // };

  const handleScheduleCall = () => {
    // You can replace this with your preferred scheduling service (Calendly, Acuity, etc.)
    window.open('https://calendly.com/weboryinfo', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950 relative overflow-x-hidden text-white">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(255,255,255,0.1); }
          50% { box-shadow: 0 0 20px rgba(255,255,255,0.3), 0 0 30px rgba(168,85,247,0.2); }
        }

        @keyframes backgroundShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse 4s ease-in-out infinite; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-shimmer { 
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        .parallax-bg {
          background: linear-gradient(135deg, #1e1b4b, #581c87, #be185d);
          background-size: 400% 400%;
          animation: backgroundShift 10s ease infinite;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .glass-effect:hover {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }

        .text-gradient {
          background: linear-gradient(135deg, #fff 0%, #a5b4fc 50%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hover-lift {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.4);
        }

        .scroll-indicator {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
          z-index: 50;
          transition: width 0.1s ease;
        }

        .team-card-expanded {
          transform: scale(1.05);
          z-index: 10;
        }

        @media (max-width: 768px) {
          .hover-lift:hover {
            transform: none;
          }
        }
      `}</style>

      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-indicator"
        style={{ width: `${(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` }}
      />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center py-20">
          <div className={`space-y-8 ${isVisible.hero ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6">
              About Webory
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Transforming ideas into digital excellence since 2024 🚀
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            </div>
          </div>
          
          <ChevronDown className="w-8 h-8 mt-12 animate-bounce text-gray-400" />
        </section>

      
        {/* Stats Section */}
        <section id="stats" className="py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`glass-effect rounded-2xl p-6 text-center hover-lift ${
                  isVisible.stats ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-indigo-400 mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold text-gradient mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>


        {/* Mission Section */}
        <section id="mission" className="py-20">
          <div className={`glass-effect rounded-3xl p-8 md:p-12 text-center hover-lift ${
            isVisible.mission ? 'animate-fadeInUp' : 'opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-8">Our Mission</h2>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
              At Webory, we're dedicated to empowering businesses through innovative technology solutions. 
              We believe in creating digital experiences that not only meet but exceed expectations, 
              helping our clients achieve their goals in the digital landscape. 🚀
            </p>
          </div>
        </section>
{/* Our Story */}
        <section id="mission" className="py-20">
          <div className={`glass-effect rounded-3xl p-8 md:p-12 text-center hover-lift ${
            isVisible.mission ? 'animate-fadeInUp' : 'opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-8">Our Story</h2>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
            "At Webory, we blend design, storytelling, and technology to build digital experiences that connect, convert, and inspire."
             <br />
            Webory began with a shared frustration—beautiful websites that lacked soul. Co-founders Ayaan and Meher, along with operations lead Zara, set out to build digital experiences that told stories, not just showed products. From humble beginnings to helping brands grow through thoughtful design and tech, Webory became a creative agency where every pixel has purpose.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section id="values" className="py-20">
          <h2 className={`text-4xl md:text-5xl font-bold text-gradient text-center mb-16 ${
            isVisible.values ? 'animate-fadeInUp' : 'opacity-0'
          }`}>
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className={`glass-effect rounded-2xl p-8 text-center hover-lift animate-glow ${
                  isVisible.values ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl mb-4 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20">
          <h2 className={`text-4xl md:text-5xl font-bold text-gradient text-center mb-16 ${
            isVisible.team ? 'animate-fadeInUp' : 'opacity-0'
          }`}>
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className={`glass-effect rounded-2xl p-8 hover-lift animate-glow ${
                  isVisible.team ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-6 animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
                    {member.image}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <h4 className="text-lg text-indigo-300 mb-4 font-medium">{member.role}</h4>
                  <p className="text-gray-300 leading-relaxed mb-6">{member.bio}</p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {member.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-indigo-600/30 text-indigo-200 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* Contact */}
                  <div className="flex justify-center gap-4">
                    <a 
                      href={`mailto:${member.social.email}`}
                      className="p-2 glass-effect rounded-lg hover:bg-indigo-600/20 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a 
                      href={`tel:${member.social.phone}`}
                      className="p-2 glass-effect rounded-lg hover:bg-green-600/20 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-20">
          <div className={`glass-effect rounded-3xl p-8 md:p-12 text-center hover-lift ${
            isVisible.cta ? 'animate-fadeInUp' : 'opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-8">
              Join Us on Our Journey
            </h2>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto mb-10">
              Let's create something amazing together. Get in touch to discuss your next project and see how we can help bring your vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="px-8 py-4 bg-gradient-to-r to-purple-600 rounded-xl font-semibold hover-lift animate-glow"
                // onClick={handleContactUs}
              >
                <Contact className="w-5 h-5 inline mr-2" />
                <a href="/contact"> Contact Us</a>
              </button>
              <button
                className="px-8 py-4 glass-effect rounded-xl font-semibold hover-lift"
                onClick={handleScheduleCall}
              >
                <Phone className="w-5 h-5 inline mr-2" />
                Schedule a Call
              </button>
            </div>
            
            <div className="mt-8 flex justify-center items-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Patna, Bihar, 20 India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">Available 24/7</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;