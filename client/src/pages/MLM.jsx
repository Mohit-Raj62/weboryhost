import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  TrendingUp,
  DollarSign,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

const MLM = () => {
  const capabilities = [
    {
      title: "Binary & Matrix Commission Engines",
      desc: "Mathematical precision engines calculating deep hierarchical payouts, downline volumes, and binary leg balances in real time.",
      icon: DollarSign,
      tags: ["Binary", "Matrix", "Unilevel", "Automated Payouts"]
    },
    {
      title: "Network & Tree Visualizer",
      desc: "Interactive canvas visualization mapping downlines, distributor genealogies, and leg volumes with instant zoom and search.",
      icon: Layers,
      tags: ["Genealogy Tree", "Downline Map", "Real-Time Sync"]
    },
    {
      title: "Automated Wallet & Payment Gateways",
      desc: "Multi-currency digital e-wallets supporting automated bank transfers, UPI payouts, and crypto settlement options.",
      icon: TrendingUp,
      tags: ["E-Wallet", "Instant Payouts", "Multi-Currency"]
    },
    {
      title: "Compliance & Anti-Fraud Telemetry",
      desc: "Automated fraud detection, KYC verification, and regulatory compliance safeguards preventing compensation exploitation.",
      icon: ShieldCheck,
      tags: ["KYC Gateways", "Fraud Anomaly Detection", "Audit Trails"]
    }
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen">
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold mb-6">
          <Layers className="w-3.5 h-3.5 text-blue-600" /> NETWORK MARKETING & COMMISSION SOFTWARE
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 max-w-4xl mx-auto leading-tight">
          High-Concurrency Network Engines That{' '}
          <span className="text-blue-600">
            Never Miss a Calculation.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Custom compensation plan architectures, interactive genealogy trees, and automated payout pipelines built for hundreds of thousands of concurrent distributors.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact?service=Network+Marketing+Software"
            className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all flex items-center gap-2"
          >
            Request Demo Sandbox <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((cap, idx) => {
            const CIcon = cap.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-6">
                  <CIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-950">{cap.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{cap.desc}</p>
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                  {cap.tags.map(t => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-600">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default MLM;

