import React from 'react';
import Navigation from '../components/Navigation';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-8">
            Cookie Policy
          </h1>
          <p className="text-xl text-white/80">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">1. What Are Cookies</h2>
            <div className="space-y-4 text-white/80">
              <p>Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide useful information to website owners.</p>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">2. Types of Cookies We Use</h2>
            <div className="space-y-4 text-white/80">
              <h3 className="text-xl font-semibold text-white">Essential Cookies</h3>
              <p>These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.</p>
              
              <h3 className="text-xl font-semibold text-white mt-6">Analytics Cookies</h3>
              <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
              
              <h3 className="text-xl font-semibold text-white mt-6">Functionality Cookies</h3>
              <p>These cookies allow the website to remember choices you make and provide enhanced, more personal features.</p>
              
              <h3 className="text-xl font-semibold text-white mt-6">Marketing Cookies</h3>
              <p>These cookies are used to track visitors across websites to display relevant advertisements.</p>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">3. How We Use Cookies</h2>
            <div className="space-y-4 text-white/80">
              <p>We use cookies for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>To remember your preferences and settings</li>
                <li>To understand how you use our website</li>
                <li>To improve our website's performance</li>
                <li>To provide personalized content and advertisements</li>
                <li>To analyze website traffic and usage patterns</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">4. Managing Cookies</h2>
            <div className="space-y-4 text-white/80">
              <p>You can control and manage cookies in various ways:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Browser settings: Most web browsers allow you to control cookies through their settings</li>
                <li>Cookie consent: We provide a cookie consent banner when you first visit our website</li>
                <li>Third-party tools: Various tools are available to help you manage cookies</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">5. Third-Party Cookies</h2>
            <div className="space-y-4 text-white/80">
              <p>Some cookies are placed by third-party services that appear on our pages. We use the following third-party services:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Google Analytics</li>
                <li>Social media platforms</li>
                <li>Advertising networks</li>
                <li>Payment processors</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">6. Updates to This Policy</h2>
            <div className="space-y-4 text-white/80">
              <p>We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.</p>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">7. Contact Us</h2>
            <div className="space-y-4 text-white/80">
              <p>If you have any questions about our Cookie Policy, please contact us at:</p>
              <p className="text-cyan-400">privacy@webory.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy; 