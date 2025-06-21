import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';
import ServiceCard from '../components/ServiceCard';
import PricingCard from '../components/PricingCard';
import ContactForm from '../components/ContactForm';

const MLM = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const services = [
    {
      title: "MLM Software",
      description: "Complete MLM software solution with advanced features.",
      icon: "💼",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Network Marketing",
      description: "Tools for managing your network marketing business.",
      icon: "🌐",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Commission Management",
      description: "Automated commission calculation and payout system.",
      icon: "💰",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Business Analytics",
      description: "Comprehensive reporting and analytics dashboard.",
      icon: "📊",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const pricingPlans = [
    {
      title: "Starter",
      price: 1999,
      features: [
        "Up to 100 Members",
        "Basic MLM Features",
        "Commission Calculator",
        "Member Dashboard",
        "Basic Reports",
        "1 Month Support"
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Professional",
      price: 4999,
      features: [
        "Up to 1000 Members",
        "Advanced MLM Features",
        "Multi-level Commission",
        "E-commerce Integration",
        "Advanced Reports",
        "3 Months Support",
        "API Access"
      ],
      isPopular: true,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Enterprise",
      price: 9999,
      features: [
        "Unlimited Members",
        "Custom MLM Features",
        "Custom Commission Rules",
        "Multiple Payment Gateways",
        "Custom Reports",
        "6 Months Support",
        "Priority Support",
        "White Label Option"
      ],
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const handlePlanSelect = (planTitle) => {
    setSelectedPlan(planTitle);
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (formData) => {
    console.log('Form submitted:', { ...formData, selectedPlan });
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navigation />
      
      <PageHeader 
        title="MLM Software Solutions"
        description="Powerful MLM software to manage and grow your network marketing business"
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
          <h2 className="text-3xl font-bold text-white mb-8">Why Choose Our MLM Software?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xl">
                ⚡
              </div>
              <h3 className="text-xl font-semibold text-white">Scalable Solution</h3>
              <p className="text-white/70">Grow your network seamlessly</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl">
                🔒
              </div>
              <h3 className="text-xl font-semibold text-white">Secure Platform</h3>
              <p className="text-white/70">Enterprise-grade security</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-xl">
                📈
              </div>
              <h3 className="text-xl font-semibold text-white">Business Growth</h3>
              <p className="text-white/70">Tools for success</p>
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
            serviceType="mlm software"
            buttonText={selectedPlan ? 'Request Quote' : 'Get Started'}
            plan={selectedPlan}
          />
        </div>
      </div>
    </div>
  );
};

export default MLM; 