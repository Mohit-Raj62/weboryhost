import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  CheckCircle2
} from 'lucide-react';

const Maintenance = () => {
  const plans = [
    {
      title: 'Essential SLA',
      price: '₹299',
      period: 'month',
      suitableFor: 'Startups & Growing Businesses',
      features: [
        '24/7 Automated Uptime Telemetry',
        'Weekly Security & Dependency Patches',
        'Cloud Database Automated Snapshots',
        'SSL Certificate & Domain Monitoring',
        'Guaranteed 12-Hour Support SLA',
        'Monthly Speed & Health Audit'
      ],
      popular: false
    },
    {
      title: 'High-Velocity Growth',
      price: '₹799',
      period: 'month',
      suitableFor: 'High-Traffic Portals & E-Commerce',
      features: [
        'Dedicated Technical Account Lead',
        '20 Hours Allocated Engineering Iterations / Mo',
        'Continuous Vulnerability & Penetration Scanning',
        'Core Web Vitals & Redis Caching Tuning',
        'Guaranteed 2-Hour Response SLA',
        'Emergency Rollback & Hotfix Protocol'
      ],
      popular: true
    },
    {
      title: 'Mission-Critical Enterprise',
      price: '₹1,899',
      period: 'month',
      suitableFor: 'Enterprise SaaS & Mission-Critical Systems',
      features: [
        '24/7/365 On-Call Principal Engineers',
        '50 Hours Custom Feature Engineering / Mo',
        'Multi-Region Disaster Recovery Guarantee',
        'SOC-2 / Compliance Continuous Auditing',
        '15-Minute Critical Incident Escalation SLA',
        'Dedicated Slack / Discord Communication'
      ],
      popular: false
    }
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen">
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          MAINTENANCE & SLA SUPPORT
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 max-w-3xl mx-auto mt-2 leading-tight">
          Reliable Software <span className="text-blue-600">Maintenance & Uptime.</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Zero downtime. Regular security updates. Continuous performance tuning. We maintain your infrastructure so you can focus entirely on growing your business.
        </p>
      </section>

      {/* Plans */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'bg-white border-2 border-blue-600 shadow-lg relative'
                  : 'bg-white border border-slate-200 hover:shadow-md'
              }`}
            >
              <div>
                {plan.popular && (
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white mb-3">
                    Recommended
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-950">{plan.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{plan.suitableFor}</p>

                <div className="my-5">
                  <span className="text-3xl font-extrabold text-slate-950">
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-500"> / {plan.period}</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-100">
                  {plan.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100">
                <Link
                  to={`/contact?service=Maintenance&plan=${encodeURIComponent(plan.title)}`}
                  className={`w-full py-2.5 rounded-xl font-semibold text-xs text-center block transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200'
                  }`}
                >
                  Activate SLA Coverage
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Maintenance;
