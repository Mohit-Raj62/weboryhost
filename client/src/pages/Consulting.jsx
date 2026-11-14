import React from 'react';
import { Link } from 'react-router-dom';
import {
  Cloud,
  Cpu,
  ShieldCheck,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const Consulting = () => {
  const pillars = [
    {
      title: "Cloud Architecture & Multi-Region Setup",
      desc: "AWS, GCP, and Docker infrastructure design for high availability, automatic failover, and minimal latency.",
      icon: Cloud,
      tags: ["AWS", "Docker", "Multi-Region", "Terraform"]
    },
    {
      title: "Cost Optimization & FinOps",
      desc: "Auditing cloud bills, rightsizing compute resources, and architecting efficient pipelines that reduce operational costs.",
      icon: TrendingUp,
      tags: ["AWS Cost Savings", "Serverless", "Auto-Scaling"]
    },
    {
      title: "Security Hardening & Best Practices",
      desc: "Vulnerability scanning, encrypted secrets management, and regulatory security compliance.",
      icon: ShieldCheck,
      tags: ["OWASP Guidelines", "Data Encryption", "Access Control"]
    },
    {
      title: "AI Strategy & Roadmap",
      desc: "Strategic guidance on integrating automation, selecting LLMs, vector search, and safe governance guardrails.",
      icon: Cpu,
      tags: ["AI Strategy", "Model Routing", "Automation"]
    }
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen">
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          IT & CLOUD CONSULTING
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 max-w-3xl mx-auto mt-2 leading-tight">
          Cloud Infrastructure & <span className="text-blue-600">Technical Advisory.</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Navigate critical technology decisions with confidence. Our senior architects guide your team through cloud setups, scalability bottlenecks, and tech roadmaps.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact?service=Cloud+Consulting"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2"
          >
            Book An Architecture Review <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, idx) => {
            const PIcon = p.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-5">
                  <PIcon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-950">{p.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  {p.tags.map(t => (
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

export default Consulting;
