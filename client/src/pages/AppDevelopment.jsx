import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';
import ServiceCard from '../components/ServiceCard';
import PricingCard from '../components/PricingCard';
import ContactForm from '../components/ContactForm';

const AppDevelopment = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const services = [
    {
      title: "iOS Development",
      description: "Native iOS apps built with Swift and SwiftUI for optimal performance.",
      icon: "📱",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Android Development",
      description: "Native Android apps using Kotlin and Jetpack Compose.",
      icon: "🤖",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Cross-Platform",
      description: "Flutter and React Native apps for both iOS and Android.",
      icon: "🔄",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "App Maintenance",
      description: "Regular updates, bug fixes, and performance optimization.",
      icon: "🔧",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const pricingPlans = [
    {
      title: "Basic",
      price: 2999,
      features: [
        "Single Platform (iOS/Android)",
        "Basic Features",
        "UI/UX Design",
        "Basic Backend",
        "App Store Submission",
        "1 Month Support"
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Professional",
      price: 5999,
      features: [
        "Cross-Platform Development",
        "Advanced Features",
        "Custom UI/UX Design",
        "Backend Development",
        "Push Notifications",
        "3 Months Support",
        "Analytics Integration"
      ],
      isPopular: true,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Enterprise",
      price: 9999,
      features: [
        "Cross-Platform Development",
        "Premium Features",
        "Custom Animations",
        "Advanced Backend",
        "Real-time Features",
        "6 Months Support",
        "Priority Support",
        "Custom Integrations"
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
        title="App Development Services"
        description="Create powerful, user-friendly mobile applications for iOS and Android"
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
          <h2 className="text-3xl font-bold text-white mb-8">Why Choose Our App Development?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xl">
                🚀
              </div>
              <h3 className="text-xl font-semibold text-white">Native Performance</h3>
              <p className="text-white/70">Optimized for each platform</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl">
                🔒
              </div>
              <h3 className="text-xl font-semibold text-white">Secure & Reliable</h3>
              <p className="text-white/70">Enterprise-grade security</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-xl">
                ⚡
              </div>
              <h3 className="text-xl font-semibold text-white">Fast Development</h3>
              <p className="text-white/70">Quick time-to-market</p>
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
            serviceType="app development"
            buttonText={selectedPlan ? 'Request Quote' : 'Get Started'}
            plan={selectedPlan}
          />
        </div>
      </div>
    </div>
  );
};

export default AppDevelopment; 