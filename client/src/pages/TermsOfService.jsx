import React from 'react';
import Navigation from '../components/Navigation';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-8">
            Terms of Service
          </h1>
          <p className="text-xl text-white/80">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">1. Acceptance of Terms</h2>
            <div className="space-y-4 text-white/80">
              <p>By accessing and using Webory's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.</p>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">2. Use License</h2>
            <div className="space-y-4 text-white/80">
              <p>Permission is granted to temporarily access our services for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or other proprietary notations</li>
                <li>Transfer the materials to another person</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">3. Service Modifications</h2>
            <div className="space-y-4 text-white/80">
              <p>Webory reserves the right to modify or discontinue, temporarily or permanently, any part of our services with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the services.</p>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">4. User Responsibilities</h2>
            <div className="space-y-4 text-white/80">
              <p>As a user of our services, you agree to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not engage in any unauthorized use of the services</li>
                <li>Not interfere with the proper working of the services</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">5. Payment Terms</h2>
            <div className="space-y-4 text-white/80">
              <p>Payment terms and conditions:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>All fees are non-refundable unless otherwise stated</li>
                <li>We reserve the right to change our fees at any time</li>
                <li>Payment is due upon receipt of invoice</li>
                <li>Late payments may result in service suspension</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">6. Limitation of Liability</h2>
            <div className="space-y-4 text-white/80">
              <p>In no event shall Webory be liable for any damages arising out of the use or inability to use our services, even if we have been notified of the possibility of such damages.</p>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">7. Contact Information</h2>
            <div className="space-y-4 text-white/80">
              <p>If you have any questions about these Terms of Service, please contact us at:</p>
              <p className="text-cyan-400">legal@webory.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 