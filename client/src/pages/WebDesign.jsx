import React from 'react';
import { Link } from 'react-router-dom';
import {
  Palette,
  Layout,
  ArrowRight,
  Eye,
  MousePointer,
  Smartphone
} from 'lucide-react';

const WebDesign = () => {
  const capabilities = [
    {
      title: "Design Systems & Component Libraries",
      desc: "Complete atomic design systems built in Figma with design tokens, strict autolayout, dark mode support, and seamless code synchronization.",
      icon: Layout,
      tags: ["Figma", "Atomic Design", "Variants", "Tokens"]
    },
    {
      title: "Interactive High-Fidelity Prototypes",
      desc: "Realistic, clickable prototypes showing micro-interactions, page transitions, and animations before writing a single line of code.",
      icon: MousePointer,
      tags: ["Figma Prototyping", "Micro-Interactions", "User Flow"]
    },
    {
      title: "Conversion-Focused User Research",
      desc: "User journey mapping, wireframing, and usability testing designed to maximize conversion rates and reduce friction.",
      icon: Eye,
      tags: ["User Journeys", "Wireframing", "CRO", "Usability"]
    },
    {
      title: "Mobile App & Responsive UI/UX",
      desc: "Pixel-perfect touch targets, clean navigation patterns, and adaptive layouts tailored for iOS and Android.",
      icon: Smartphone,
      tags: ["iOS Guidelines", "Material 3", "Mobile UX"]
    }
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen">
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          PRODUCT & UI/UX DESIGN
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 max-w-3xl mx-auto mt-2 leading-tight">
          Clean, User-Centric <span className="text-blue-600">Interface Design.</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          We merge visual clarity with cognitive user experience. We design digital interfaces that are easy to use, aesthetically pleasing, and built to convert.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact?service=UI/UX+Design"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2"
          >
            Design Your Product <ArrowRight className="w-4 h-4" />
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
    </div>
  );
};

export default WebDesign;
