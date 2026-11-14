import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Cpu,
  Layers,
  Zap,
  CheckCircle2,
  ArrowRight,
  Globe,
  Database
} from 'lucide-react';

const WebDevelopment = () => {
  const capabilities = [
    {
      title: "Full-Stack Web Applications",
      desc: "Robust Next.js & React architectures with server-side rendering (SSR), edge caching, and scalable REST/GraphQL APIs.",
      icon: Globe,
      tags: ["Next.js 15", "React 19", "TypeScript", "Node.js"]
    },
    {
      title: "Enterprise SaaS Platforms",
      desc: "Multi-tenant platforms with complex role-based access control (RBAC), subscription billing, and real-time telemetry.",
      icon: Cpu,
      tags: ["Multi-Tenant", "Stripe Billing", "Microservices", "Redis"]
    },
    {
      title: "Headless E-Commerce Engines",
      desc: "Blazing fast online retail experiences with headless Shopify Plus, custom carts, and instant checkout flows.",
      icon: Zap,
      tags: ["Shopify Plus", "Tailwind", "Algolia", "Webhooks"]
    },
    {
      title: "Custom CMS & Portals",
      desc: "Intuitive content platforms built for speed, SEO domination, and seamless editorial workflows.",
      icon: Database,
      tags: ["Sanity", "Strapi", "Dynamic Schema", "CDN Edge"]
    }
  ];

  const plans = [
    {
      name: "Startup MVP Web Plan",
      price: "₹1,499",
      idealFor: "Startups validating their product idea",
      features: [
        "Up to 6 Custom High-Speed Pages",
        "Next.js / React Modern Stack",
        "Responsive Mobile & Tablet Optimization",
        "Contact & Lead Capture Pipeline",
        "Technical SEO & Schema Optimization",
        "Free SSL & Global CDN Deployment",
        "30 Days Post-Launch Support"
      ],
      popular: false
    },
    {
      name: "Scale & Growth SaaS Plan",
      price: "₹3,499",
      idealFor: "Growing companies scaling traffic and revenue",
      features: [
        "Full-Stack Web App (Up to 15 Views)",
        "User Authentication & Roles (JWT/Auth0)",
        "Relational Database (PostgreSQL / Supabase)",
        "Admin Dashboard & Data Visualizations",
        "Payment Gateway Integration (Stripe/Razorpay)",
        "Automated CI/CD Pipeline & Staging Environment",
        "60 Days Dedicated Support & Monitoring"
      ],
      popular: true
    },
    {
      name: "Enterprise Architecture Plan",
      price: "Custom",
      idealFor: "High-concurrency platforms & enterprise scale",
      features: [
        "Unlimited Custom Workflows & Microservices",
        "Multi-Region Auto-Scaling Cloud Clusters",
        "AI / Automation Feature Integration",
        "SOC-2 / Security Hardening",
        "Custom Third-Party Enterprise API Bridges",
        "Dedicated Lead Engineer & Weekly Sprints",
        "Priority Escalation Support"
      ],
      popular: false
    }
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen">
      {/* Hero */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          FULL-STACK WEB ENGINEERING
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 max-w-3xl mx-auto mt-2 leading-tight">
          Web Platforms Built For <span className="text-blue-600">Speed & Scale.</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          We combine modern front-end engineering with reliable backend architecture. Every web application we build is designed for fast response times and clean maintainability.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact?service=Web+Engineering"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2"
          >
            Start Your Web Project <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#pricing"
            className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs sm:text-sm font-medium transition-colors shadow-sm"
          >
            View Pricing Tiers
          </a>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">CAPABILITIES</span>
          <h2 className="text-3xl font-extrabold text-slate-950 mt-1">
            Engineered For Performance & Growth
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, idx) => {
            const CIcon = cap.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-5">
                  <CIcon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-950">{cap.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{cap.desc}</p>
                <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
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

      {/* Pricing Matrix */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">TRANSPARENT PRICING</span>
          <h2 className="text-3xl font-extrabold text-slate-950 mt-1">
            Web Engineering Packages
          </h2>
        </div>

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
                <h3 className="text-xl font-bold text-slate-950">{plan.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{plan.idealFor}</p>

                <div className="my-5">
                  <span className="text-3xl font-extrabold text-slate-950">
                    {plan.price}
                  </span>
                  {plan.price !== 'Custom' && <span className="text-xs text-slate-500"> / project</span>}
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
                  to={`/contact?service=Web+Engineering&plan=${encodeURIComponent(plan.name)}`}
                  className={`w-full py-2.5 rounded-xl font-semibold text-xs text-center block transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200'
                  }`}
                >
                  Select Plan
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WebDevelopment;
