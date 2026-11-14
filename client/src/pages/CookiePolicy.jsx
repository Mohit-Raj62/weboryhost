import React from 'react';
import { Cookie } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-4">
            <Cookie className="w-3.5 h-3.5 text-blue-600" /> COOKIE GOVERNANCE
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950">
            Cookie Policy
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Last updated: {new Date().toLocaleDateString()} • Webory Technologies
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950 mb-4">1. How We Use Cookies</h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>We use essential and analytics cookies exclusively to ensure session security, remember user portal preferences, and monitor edge CDN latency metrics.</p>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950 mb-4">2. Managing Preferences</h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>You can adjust your browser settings to reject non-essential telemetry cookies at any time without impacting core site availability.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
