import React from 'react';
import Navigation from '../components/Navigation';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-8">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/80">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">1. Information We Collect</h2>
            <div className="space-y-4 text-white/80">
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Name and contact information</li>
                <li>Account credentials</li>
                <li>Payment information</li>
                <li>Communication preferences</li>
                <li>Feedback and survey responses</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">2. How We Use Your Information</h2>
            <div className="space-y-4 text-white/80">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide and maintain our services</li>
                <li>Process your transactions</li>
                <li>Send you technical notices and support messages</li>
                <li>Communicate with you about products, services, and events</li>
                <li>Improve our services and develop new features</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">3. Information Sharing</h2>
            <div className="space-y-4 text-white/80">
              <p>We may share your information with:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Service providers and business partners</li>
                <li>Legal authorities when required by law</li>
                <li>Other parties with your consent</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">4. Data Security</h2>
            <div className="space-y-4 text-white/80">
              <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">5. Your Rights</h2>
            <div className="space-y-4 text-white/80">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to data processing</li>
                <li>Data portability</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">6. Contact Us</h2>
            <div className="space-y-4 text-white/80">
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p className="text-cyan-400">weboryinfo@gmail.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 