import React from 'react';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> LEGAL & PRIVACY
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Last updated: {new Date().toLocaleDateString()} • Webory Technologies
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950 mb-4">1. Information We Collect</h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>We collect information that you provide directly to us when contacting our technical team or commissioning projects:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2 text-slate-600">
                <li>Name, organization, and professional contact information</li>
                <li>Project technical specifications and architecture briefs</li>
                <li>Authentication and workspace credentials</li>
                <li>Invoice and payment transaction records</li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950 mb-4">2. Mutual Non-Disclosure & Security</h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>All client proprietary software architecture, databases, business logic, and trade secrets are treated under strict mutual non-disclosure (NDA) protocols. We enforce encrypted cloud repositories and zero-knowledge storage standards.</p>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950 mb-4">3. Data Retention & Source Code Rights</h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>Clients retain 100% intellectual property rights over completed deliverables upon settlement. Project data can be permanently purged upon written request at supportwebory@gmail.com.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
