import React from 'react';
import { Shield } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-4">
            <Shield className="w-3.5 h-3.5 text-blue-600" /> MASTER SERVICE TERMS
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Last updated: {new Date().toLocaleDateString()} • Webory Technologies
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950 mb-4">1. Scope of Engagement</h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>Webory delivers bespoke software engineering, mobile application development, UI/UX architecture, and cloud consultancy governed by mutually approved Statements of Work (SOW) and agile milestones.</p>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950 mb-4">2. Intellectual Property Ownership</h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>Upon final milestone clearance, all bespoke source code, design systems, application assets, and cloud deployment scripts become the exclusive intellectual property of the commissioning client with zero vendor lock-in.</p>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950 mb-4">3. Warranty & SLA Guarantees</h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>All production deliveries include a minimum 45-day post-launch warranty covering software defects, regression anomalies, and performance benchmarks outlined in the original technical blueprint.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
