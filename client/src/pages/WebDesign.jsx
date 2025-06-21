import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';
import ServiceCard from '../components/ServiceCard';
import PricingCard from '../components/PricingCard';
import ContactForm from '../components/ContactForm';

const WebDesign = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const services = [
    {
      title: "Responsive Design",
      description: "Create beautiful, mobile-friendly websites that look great on any device.",
      icon: "📱",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "UI/UX Design",
      description: "User-centered design that enhances user experience and engagement.",
      icon: "🎨",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Custom Themes",
      description: "Unique and tailored designs that reflect your brand identity.",
      icon: "🎯",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "E-commerce Design",
      description: "Optimized shopping experiences that drive conversions.",
      icon: "🛍️",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const pricingPlans = [
    {
      title: "Basic",
      price: 999,
      features: [
        "5 Pages Design",
        "Mobile Responsive",
        "Basic SEO Setup",
        "Contact Form",
        "Social Media Integration",
        "1 Month Support"
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Professional",
      price: 2499,
      features: [
        "10 Pages Design",
        "Mobile Responsive",
        "Advanced SEO Setup",
        "E-commerce Integration",
        "Custom Animations",
        "3 Months Support",
        "Content Management System"
      ],
      isPopular: true,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Enterprise",
      price: 4999,
      features: [
        "Unlimited Pages",
        "Mobile Responsive",
        "Premium SEO Setup",
        "Advanced E-commerce",
        "Custom Development",
        "6 Months Support",
        "Priority Support",
        "Custom Features"
      ],
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const handlePlanSelect = (planTitle) => {
    setSelectedPlan(planTitle);
    // Scroll to contact form
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (formData) => {
    // Here you would typically send the data to your backend
    console.log('Form submitted:', { ...formData, selectedPlan });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navigation />
      
      <PageHeader 
        title="Web Design Services"
        description="Transform your digital presence with our cutting-edge web design solutions"
        gradient="from-indigo-900 via-purple-900 to-pink-900"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Why Choose Our Web Design Services?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xl">
                ⚡
              </div>
              <h3 className="text-xl font-semibold text-white">Fast Performance</h3>
              <p className="text-white/70">Optimized for speed and efficiency</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl">
                🔒
              </div>
              <h3 className="text-xl font-semibold text-white">Secure & Reliable</h3>
              <p className="text-white/70">Built with security best practices</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-xl">
                📈
              </div>
              <h3 className="text-xl font-semibold text-white">SEO Friendly</h3>
              <p className="text-white/70">Optimized for search engines</p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                {...plan}
                onSelect={handlePlanSelect}
                buttonText={selectedPlan === plan.title ? 'Selected' : 'Get Started'}
              />
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div id="contact-form" className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {selectedPlan ? `Get Started with ${selectedPlan} Plan` : 'Contact Us'}
          </h2>
          <ContactForm
            serviceType="web design"
            buttonText={selectedPlan ? 'Request Quote' : 'Get Started'}
            plan={selectedPlan}
          />
        </div>
      </div>
    </div>
  );
};

export default WebDesign; 