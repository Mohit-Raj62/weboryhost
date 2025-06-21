import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';
import ServiceCard from '../components/ServiceCard';
import PricingCard from '../components/PricingCard';
import ContactForm from '../components/ContactForm';

const SEO = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const services = [
    {
      title: "SEO Optimization",
      description: "Comprehensive search engine optimization to improve your rankings.",
      icon: "🔍",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Social Media Marketing",
      description: "Engaging social media campaigns to grow your audience.",
      icon: "📱",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Content Marketing",
      description: "High-quality content creation to attract and engage users.",
      icon: "✍️",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "PPC Advertising",
      description: "Targeted paid advertising campaigns for maximum ROI.",
      icon: "💰",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const pricingPlans = [
    {
      title: "Basic",
      price: 499,
      features: [
        "Keyword Research",
        "On-page SEO",
        "Monthly Reports",
        "Basic Content Creation",
        "Social Media Setup",
        "1 Month Support"
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Professional",
      price: 999,
      features: [
        "Advanced SEO Strategy",
        "Content Marketing",
        "Social Media Management",
        "PPC Campaign Setup",
        "Monthly Analytics",
        "3 Months Support",
        "Competitor Analysis"
      ],
      isPopular: true,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Enterprise",
      price: 1999,
      features: [
        "Full Digital Marketing Suite",
        "Custom Strategy",
        "Advanced Analytics",
        "Priority Support",
        "6 Months Support",
        "Dedicated Account Manager",
        "Custom Reports",
        "ROI Tracking"
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
        title="SEO & Digital Marketing Services"
        description="Boost your online presence with our comprehensive digital marketing solutions"
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
          <h2 className="text-3xl font-bold text-white mb-8">Why Choose Our Digital Marketing?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xl">
                📈
              </div>
              <h3 className="text-xl font-semibold text-white">Proven Results</h3>
              <p className="text-white/70">Data-driven strategies</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl">
                🎯
              </div>
              <h3 className="text-xl font-semibold text-white">Targeted Approach</h3>
              <p className="text-white/70">Reach your ideal audience</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-xl">
                📊
              </div>
              <h3 className="text-xl font-semibold text-white">Detailed Analytics</h3>
              <p className="text-white/70">Track your success</p>
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
            serviceType="digital marketing"
            buttonText={selectedPlan ? 'Request Quote' : 'Get Started'}
            plan={selectedPlan}
          />
        </div>
      </div>
    </div>
  );
};

export default SEO; 