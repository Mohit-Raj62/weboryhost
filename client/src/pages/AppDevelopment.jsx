import React from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  Layers,
  Zap,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Wifi
} from 'lucide-react';

const AppDevelopment = () => {
  const capabilities = [
    {
      title: "Cross-Platform Flutter & React Native",
      desc: "One single high-performance codebase targeting both iOS and Android natively, saving engineering and maintenance costs.",
      icon: Layers,
      tags: ["Flutter", "React Native", "Dart", "TypeScript"]
    },
    {
      title: "Native iOS (Swift & SwiftUI)",
      desc: "Bespoke iOS experiences built to leverage Apple Silicon, CoreData, widgets, and dynamic island integrations.",
      icon: Smartphone,
      tags: ["Swift", "SwiftUI", "CoreData"]
    },
    {
      title: "Native Android (Kotlin & Jetpack Compose)",
      desc: "Material design, background services, and fine-tuned device telemetry tailored for the entire Android ecosystem.",
      icon: Cpu,
      tags: ["Kotlin", "Jetpack Compose", "Coroutines"]
    },
    {
      title: "Offline-First Synchronization",
      desc: "Local embedded databases with automated cloud synchronization engines ensuring app availability in low-connectivity areas.",
      icon: Wifi,
      tags: ["SQLite", "WatermelonDB", "Delta Sync"]
    }
  ];

  const plans = [
    {
      name: "Mobile MVP Package",
      price: "₹2,499",
      idealFor: "Startups launching on iOS and Android simultaneously",
      features: [
        "Cross-Platform Flutter Codebase",
        "Up to 8 Core Screens & Navigation Flow",
        "Firebase / REST API Integration",
        "Push Notifications & User Authentication",
        "App Store & Google Play Submission Support",
        "45 Days Warranty & Bug Fix Support"
      ],
      popular: false
    },
    {
      name: "Standard Growth App",
      price: "₹4,999",
      idealFor: "Established brands building a flagship mobile experience",
      features: [
        "Full-Featured iOS & Android Applications",
        "In-App Purchases (StoreKit & Google Play Billing)",
        "Biometric Authentication (FaceID/Fingerprint)",
        "Custom UI & Micro-Interactions",
        "Real-Time Chat & Activity WebSockets",
        "Automated CI/CD Builds via Fastlane",
        "90 Days Dedicated SLA Support"
      ],
      popular: true
    },
    {
      name: "Enterprise Mobile Solution",
      price: "Custom",
      idealFor: "Enterprise mobile ecosystems & offline workforces",
      features: [
        "Unlimited Custom Native Modules",
        "Hardware Integration (BLE, RFID, Sensors)",
        "End-to-End Enterprise MDM Deployment",
        "Regulatory & Security Hardening",
        "Dedicated Mobile Lead & Bi-Weekly Releases",
        "Priority Emergency Telemetry"
      ],
      popular: false
    }
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen">
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          MOBILE APPLICATION ENGINEERING
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 max-w-3xl mx-auto mt-2 leading-tight">
          Mobile Applications Built For <span className="text-blue-600">iOS & Android.</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          We build fluid, reliable mobile applications for iOS and Android. Engineered for smooth native performance, offline support, and clean cloud synchronization.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact?service=Mobile+App+Development"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2"
          >
            Start Your App Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
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

      {/* Pricing */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">PRICING PACKAGES</span>
          <h2 className="text-3xl font-extrabold text-slate-950 mt-1">
            Mobile Development Packages
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
                  to={`/contact?service=Mobile+App+Development&plan=${encodeURIComponent(plan.name)}`}
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

export default AppDevelopment;
