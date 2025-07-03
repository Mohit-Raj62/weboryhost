import React, { useState, useEffect } from 'react';
import AdsPopup from '../components/AdsPopup';

// Mock Link component - replace with actual react-router-dom Link
const Link = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>{children}</a>
);

const ImageWithLoading = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 image-placeholder animate-pulse"></div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const featuredProjects = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      type: 'Full Stack Development',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      category: 'Web Development',
      technologies: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      name: 'Corporate Website',
      type: 'UI/UX Design',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      category: 'Web Design',
      technologies: ['Figma', 'React', 'Tailwind']
    },
    {
      id: 3,
      name: 'Mobile App Design',
      type: 'Mobile Development',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      category: 'Mobile App',
      technologies: ['Flutter', 'Firebase', 'Figma']
    },
    {
      id: 4,
      name: 'Brand Identity',
      type: 'Branding & Logo',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      category: 'Branding',
      technologies: ['Illustrator', 'Photoshop', 'InDesign']
    }
  ];

  const services = [
    { 
      id: 1, 
      name: 'Web Development', 
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
      description: 'Custom websites and web applications built with modern technologies',
      detailedDescription: 'Full-stack development services including responsive design, e-commerce solutions, CMS integration, and progressive web applications. We use cutting-edge technologies like React, Node.js, and cloud services.',
      icon: '🚀',
      features: ['Responsive Design', 'E-commerce Solutions', 'CMS Integration', 'SEO Optimization', 'Performance Optimization'],
      pricing: {
        basic: { price: 'FREE', plan: 'Basic Website', features: ['5 Pages', 'Responsive Design', 'Contact Form', '3 Months Support'] },
        standard: { price: '$121', plan: 'Business Website', features: ['10 Pages', 'CMS Integration', 'E-commerce Ready', 'SEO Optimization', '6 Months Support'] },
        premium: { price: '$251', plan: 'Enterprise Solution', features: ['Unlimited Pages', 'Custom Features', 'Advanced Integrations', 'Priority Support', '12 Months Support'] }
      }
    },
    { 
      id: 2, 
      name: 'UI/UX Design', 
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=250&fit=crop',
      description: 'User-centered design that creates exceptional digital experiences',
      detailedDescription: 'Complete design services from user research and wireframing to high-fidelity prototypes and design systems. We focus on creating intuitive, accessible, and conversion-optimized interfaces.',
      icon: '🎨',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing'],
      pricing: {
        basic: { price: 'FREE', plan: 'Design Package', features: ['5 Screens', 'Wireframes', 'High-fidelity Mockups', '2 Revisions'] },
        standard: { price: '$99', plan: 'Complete UX/UI', features: ['15 Screens', 'User Research', 'Interactive Prototype', 'Design System', '4 Revisions'] },
        premium: { price: '$139', plan: 'Enterprise Design', features: ['Unlimited Screens', 'Advanced Research', 'Usability Testing', 'Brand Guidelines', 'Unlimited Revisions'] }
      }
    },
    { 
      id: 3, 
      name: 'Mobile Apps', 
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
      description: 'Native and cross-platform mobile applications for iOS and Android',
      detailedDescription: 'End-to-end mobile app development including native iOS/Android apps, cross-platform solutions with React Native/Flutter, app store optimization, and ongoing maintenance.',
      icon: '📱',
      features: ['Native Development', 'Cross-platform Apps', 'App Store Optimization', 'Push Notifications', 'Analytics Integration'],
      pricing: {
        basic: { price: 'FREE', plan: 'Simple App', features: ['Single Platform', 'Basic Features', 'App Store Submission', '3 Months Support'] },
        standard: { price: '$199', plan: 'Cross-platform App', features: ['iOS & Android', 'Advanced Features', 'Push Notifications', 'Analytics', '6 Months Support'] },
        premium: { price: '$299', plan: 'Enterprise App', features: ['Custom Features', 'Backend Integration', 'Advanced Security', 'Scalable Architecture', '12 Months Support'] }
      }
    },
    { 
      id: 4, 
      name: 'Digital Marketing', 
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      description: 'SEO, social media marketing, and digital strategy to grow your business',
      detailedDescription: 'Comprehensive digital marketing services including SEO optimization, social media management, content marketing, PPC campaigns, and conversion rate optimization to maximize your online presence.',
      icon: '📈',
      features: ['SEO Optimization', 'Social Media Management', 'Content Marketing', 'PPC Campaigns', 'Analytics & Reporting'],
      pricing: {
        basic: { price: '$0/mo', plan: 'Starter Package', features: ['Basic SEO', 'Social Media Setup', 'Monthly Reports', 'Email Support'] },
        standard: { price: '$199/mo', plan: 'Growth Package', features: ['Advanced SEO', 'Content Creation', 'PPC Management', 'Social Media Management', 'Bi-weekly Calls'] },
        premium: { price: '$399/mo', plan: 'Enterprise Marketing', features: ['Full-service Marketing', 'Dedicated Manager', 'Custom Strategy', 'Advanced Analytics', 'Weekly Strategy Calls'] }
      }
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Ayaan Singh',
      company: 'TechStart Inc.',
      text: 'Webory transformed our vision into a stunning website that exceeded all expectations. Their attention to detail is remarkable.',
      // image: 'https://images.unsplash.com/photo-1494790108755-2616b612b601?w=100&h=100&fit=crop&crop=face',
      rating: 5
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      company: 'Design Studio',
      text: 'Professional, creative, and delivered on time. The team at Webory is simply outstanding at what they do.',
      // image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 5
    },
    {
      id: 3,
      name: 'Ekansh Singh',
      company: 'E-Commerce Pro',
      text: 'Our online sales increased by 300% after Webory redesigned our website. Incredible results and fantastic team!',
      // image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      rating: 5
    }
  ];

  const stats = [
    { number: '100+', label: 'Projects Completed', icon: '✨' },
    { number: '50+', label: 'Happy Clients', icon: '😊' },
    { number: '2+', label: 'Years Experience', icon: '🏆' },
    { number: '24/7', label: 'Support Available', icon: '🔧' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Simulate loading time for images and content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-x-hidden">
      <AdsPopup />
      {/* Fixed Background with proper z-index */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20"></div>
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-500/30 blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x / 20}px`,
            top: `${mousePosition.y / 20}px`,
            transform: 'translate(-50%, -50%)'
          }}
        ></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-pink-400/20 to-red-500/20 blur-3xl animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-3xl animate-pulse delay-1000"></div>
      </div>

      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-400"></div>
        </div>
      ) : (
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
            <div className="relative z-20 text-center text-white max-w-7xl mx-auto">
              <div className="mb-8">
                <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6 animate-fade-in opacity-0 animate-pulse">
                  <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    ✨ Welcome to WEBORY the Future of Digital Design
                  </span>
                </div>
              </div>
              
              <h1 className="text-6xl lg:text-8xl xl:text-9xl font-black mb-8 leading-none tracking-tight">
                We Create
                <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  Digital Magic
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl xl:text-3xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed font-light">
                Transform your business with stunning websites, powerful applications, and innovative digital solutions that drive extraordinary results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Link 
                  to="/contact" 
                  className="group relative bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-10 py-5 rounded-full text-xl font-bold transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 no-underline overflow-hidden"
                >
                  <span className="relative z-10">Start Your Project</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
                <Link 
                  to="/portfolio" 
                  className="group relative border-2 border-white/30 hover:border-white/60 backdrop-blur-md hover:bg-white/10 text-white px-10 py-5 rounded-full text-xl font-bold transition-all duration-500 hover:scale-110 no-underline overflow-hidden"
                >
                  <span className="relative z-10">View Our Work</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="relative py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </div>
                      <h3 className="text-4xl lg:text-6xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text mb-3">
                        {stat.number}
                      </h3>
                      <p className="text-white/80 text-lg font-medium">{stat.label}</p>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="relative py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
                  <span className="text-sm font-medium text-cyan-400">Our Expertise</span>
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-white mb-8">Our Services</h2>
                <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                  We offer comprehensive digital solutions to help your business thrive in the modern world
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {services.map((service) => (
                  <div key={service.id} className="group relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 transform hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="aspect-video overflow-hidden relative">
                      <ImageWithLoading 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-6 left-6 text-4xl bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
                        {service.icon}
                      </div>
                      <div className="absolute top-6 right-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                        Starting at {service.pricing.basic.price}
                      </div>
                    </div>
                    
                    <div className="relative p-8">
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">
                        {service.name}
                      </h3>
                      <p className="text-white/70 text-lg leading-relaxed group-hover:text-white/90 transition-colors duration-500 mb-6">
                        {service.description}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="text-cyan-400 font-semibold mb-3">Key Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm border border-white/20">
                              {feature}
                            </span>
                          ))}
                          {service.features.length > 3 && (
                            <span className="text-cyan-400 text-sm font-medium">
                              +{service.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => setSelectedService(service)}
                          className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                          View Pricing Plans
                        </button>
                        <Link 
                          to={`/services`}
                          className="flex-1 border-2 border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400/10 text-cyan-400 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 text-center no-underline"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Detail Modal */}
              {selectedService && (
                <div className="fixed top-0 left-0 w-full h-full z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
                  <div className="w-full sm:w-auto bg-white/10 backdrop-blur-xl rounded-t-2xl sm:rounded-3xl border border-white/20 max-h-[90vh] overflow-y-auto shadow-2xl relative"
                    style={{maxWidth: '100%', minHeight: '40vh'}}>
                    {/* Fixed close button */}
                    <button
                      onClick={() => setSelectedService(null)}
                      className="fixed top-2 right-2 sm:top-6 sm:right-6 text-white/70 hover:text-white text-3xl font-bold w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors focus:outline-none z-50"
                      aria-label="Close"
                    >
                      ❌
                    </button>
                    <div className="bg-white/5 backdrop-blur-xl border-b border-white/20 p-3 sm:p-6 flex items-center gap-4">
                      <div className="text-3xl">{selectedService.icon}</div>
                      <h3 className="text-2xl font-bold text-white">{selectedService.name}</h3>
                    </div>
                    
                    <div className="p-3 sm:p-6">
                      <div className="mb-8">
                        <p className="text-white/80 text-sm sm:text-lg leading-relaxed mb-4 sm:mb-6">
                          {selectedService.detailedDescription}
                        </p>
                        
                        <div className="mb-6">
                          <h4 className="text-cyan-400 font-semibold text-sm sm:text-lg mb-2 sm:mb-4">Complete Feature List:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            {selectedService.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 sm:gap-3 text-white/80 text-xs sm:text-base">
                                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
                        {Object.entries(selectedService.pricing).map(([planKey, plan]) => (
                          <div key={planKey} className={`relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all duration-300 ${
                            planKey === 'standard' 
                              ? 'border-cyan-400/50 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 scale-105' 
                              : 'border-white/20 hover:border-white/40'
                          }`}>
                            {planKey === 'standard' && (
                              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold">
                                Most Popular
                              </div>
                            )}
                            
                            <div className="text-center mb-4 sm:mb-6">
                              <h4 className="text-base sm:text-xl font-bold text-white mb-1 sm:mb-2">{plan.plan}</h4>
                              <div className="text-xl sm:text-3xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                                {plan.price}
                              </div>
                              {plan.price.includes('/mo') && (
                                <p className="text-white/60 text-xs sm:text-sm mt-1">per month</p>
                              )}
                            </div>
                            
                            <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                              {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 sm:gap-3 text-white/80 text-xs sm:text-base">
                                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            
                            <Link
                              to="/contact"
                              className={`block text-center px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 no-underline ${
                                planKey === 'standard'
                                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg'
                                  : 'border-2 border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400/10 text-cyan-400'
                              }`}
                            >
                              Get Started
                            </Link>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 sm:mt-8 text-center">
                        <p className="text-white/60 mb-2 sm:mb-4 text-xs sm:text-base">Need a custom solution? We'd love to discuss your specific requirements.</p>
                        <Link
                          to="/contact"
                          className="inline-block bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 border border-white/20 no-underline text-xs sm:text-base"
                        >
                          Request Custom Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Featured Projects Section */}
          <section className="relative py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
                  <span className="text-sm font-medium text-purple-400">Portfolio Showcase</span>
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-white mb-8">Featured Work</h2>
                <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                  Explore some of our recent projects and see how we've helped businesses achieve their digital goals
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {featuredProjects.map((project) => (
                  <div 
                    key={project.id} 
                    className="group relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="aspect-video overflow-hidden relative">
                      <ImageWithLoading 
                        src={project.image} 
                        alt={project.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                    
                    <div className="relative p-8">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-shadow duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">
                        {project.name}
                      </h3>
                      <p className="text-cyan-400 font-bold text-lg mb-2">{project.category}</p>
                      <p className="text-white/70 text-lg group-hover:text-white/90 transition-colors duration-500">{project.type}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-16">
                <Link 
                  to="/portfolio" 
                  className="group relative inline-block bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-12 py-6 rounded-full text-xl font-bold transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 no-underline overflow-hidden"
                >
                  <span className="relative z-10">View All Projects</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="relative py-24 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-20">
                <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
                  <span className="text-sm font-medium text-pink-400">Client Stories</span>
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-white mb-8">What Clients Say</h2>
                <p className="text-xl lg:text-2xl text-white/80">
                  Don't just take our word for it - hear from our satisfied clients
                </p>
              </div>
              
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-12 lg:p-16 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl"></div>
                
                <div className="relative text-center">
                  <div className="mb-8">
                    <ImageWithLoading 
                      src={testimonials[currentTestimonial].image} 
                      alt={testimonials[currentTestimonial].name}
                      className="w-24 h-24 rounded-full mx-auto border-4 border-white/20 shadow-2xl"
                    />
                  </div>
                  
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  
                  <blockquote className="text-2xl lg:text-3xl text-white mb-8 leading-relaxed italic font-light">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                  
                  <cite className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-bold text-xl lg:text-2xl">
                    {testimonials[currentTestimonial].name}
                  </cite>
                  <p className="text-white/70 text-lg mt-2">
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
                
                <div className="flex justify-center mt-12 space-x-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-500 hover:scale-125 ${
                        index === currentTestimonial 
                          ? 'bg-gradient-to-r from-cyan-400 to-purple-400 scale-125 shadow-lg' 
                          : 'bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative py-24 px-6">
            <div className="max-w-5xl mx-auto text-center">
              <div className="relative bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 rounded-3xl p-12 lg:p-16 overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
                
                <div className="relative">
                  <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight">
                    Ready to Start Your Next Project?
                  </h2>
                  <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Let's work together to create something amazing. Get in touch with us and let's discuss your vision.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link 
                      to="/contact" 
                      className="group relative bg-white hover:bg-gray-100 text-gray-900 px-10 py-5 rounded-full text-xl font-bold transition-all duration-500 hover:scale-110 hover:shadow-2xl no-underline overflow-hidden"
                    >
                      <span className="relative z-10">Get Started Today</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </Link>
                    <Link 
                      to="/about" 
                      className="group relative border-2 border-white hover:border-white/80 backdrop-blur-md hover:bg-white/10 text-white px-10 py-5 rounded-full text-xl font-bold transition-all duration-500 hover:scale-110 no-underline overflow-hidden"
                    >
                      <span className="relative z-10">Learn More About Us</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
