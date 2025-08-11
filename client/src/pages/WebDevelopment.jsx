import React, { useState, useRef } from 'react';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';
import ServiceCard from '../components/ServiceCard';
import PricingCard from '../components/PricingCard';
import ContactForm from '../components/ContactForm';

const WebDevelopment = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const contactFormRef = useRef(null);

  const services = [
    {
      title: "Custom Development",
      description: "Tailored web applications built to your specific requirements.",
      icon: "⚡",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "E-commerce Solutions",
      description: "Powerful online stores with secure payment processing.",
      icon: "🛍️",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "CMS Development",
      description: "Easy-to-manage content management systems.",
      icon: "📝",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "API Integration",
      description: "Seamless integration with third-party services.",
      icon: "🔌",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const pricingPlans = [
    {
      title: "Basic Website Plan" ,
      price: 169,
      features: [
        "SEO",
        "Basic Database Setup",
        "4-5 Pages Development",
        "Social Media Integration",
        "Contact Form integration",
        "Mobile Responsive Design",
        "1 free domain + hosting (optional upsell)",
        "1 Month Support"
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Standard Business Website Plan",
      price: 399,
      features: [
        "6-10 Pages Development",
        "Basic SEO",
        "Basic Modern UI/UX design",
        "1-year hosting + SSL",
        "Admin panel (basic CMS)",
        "Payment Integration",
        "Admin Dashboard",
        "3 Months Support",
      ],
      isPopular: true,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Premium / E-Commerce Website Plan",
      price: 1199,
      features: [
          "Advanced UI/UX + animations",
          "Payment gateway integration",
          "Advanced SEO + speed optimization",
          "Unlimited Pages/ product listing",
          "User login / account system",
          "Inventory & order management",
          "Priority Support",
          "6 Months Support"
      ],
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const handlePlanSelect = (planTitle) => {
    setSelectedPlan(planTitle);
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // The handleFormSubmit function is defined but not used, as ContactForm handles its own submission.
  // const handleFormSubmit = async (formData) => {
  //   console.log('Form submitted:', { ...formData, selectedPlan });
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navigation />
      
      <PageHeader 
        title="Web Development Services"
        description="Build powerful, scalable web applications with our expert development team"
        gradient="from-indigo-900 via-purple-900 to-pink-900"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Why Choose Our Development Services?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xl">
                🚀
              </div>
              <h3 className="text-xl font-semibold text-white">Scalable Solutions</h3>
              <p className="text-white/70">Built to grow with your business</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl">
                🔒
              </div>
              <h3 className="text-xl font-semibold text-white">Secure Code</h3>
              <p className="text-white/70">Enterprise-grade security</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-xl">
                ⚡
              </div>
              <h3 className="text-xl font-semibold text-white">High Performance</h3>
              <p className="text-white/70">Optimized for speed</p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <PricingCard
                key={plan.title}
                {...plan}
                onSelect={handlePlanSelect}
                buttonText={selectedPlan === plan.title ? 'Selected' : 'Get Started'}
              />
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div id="contact-form" ref={contactFormRef} className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {selectedPlan ? `Get Started with ${selectedPlan} Plan` : 'Contact Us'}
          </h2>
          <ContactForm
            serviceType="web development"
            buttonText={selectedPlan ? 'Request Quote' : 'Get Started'}
            plan={selectedPlan}
            fromName="Webory Web Development"
            subject={selectedPlan ? `New Quote Request for ${selectedPlan} Plan` : 'New Inquiry from Webory Website'}
          />
        </div>
      </div>
    </div>
  );
};

export default WebDevelopment; 