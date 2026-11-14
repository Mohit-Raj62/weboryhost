import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Smartphone,
  Bot,
  Layers,
  CheckCircle2
} from 'lucide-react';

const GetStarted = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState({
    platform: 'Web Application',
    timeline: '4 - 8 weeks',
    budget: '₹3,000 - ₹8,000',
    name: '',
    email: '',
    phone: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#f8fafc] text-slate-900 py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            PROJECT ONBOARDING
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-1">
            Start Your Project With Webory
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            3 simple steps to outline your scope and get an estimated development plan.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-10">
          {[
            { num: 1, label: 'Platform' },
            { num: 2, label: 'Budget & Timeline' },
            { num: 3, label: 'Details' }
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  currentStep >= s.num
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {currentStep > s.num ? <CheckCircle className="w-4 h-4" /> : s.num}
              </div>
              <span
                className={`text-xs font-medium ${
                  currentStep >= s.num ? 'text-slate-950 font-semibold' : 'text-slate-400'
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Wizard Box */}
        <div className="rounded-3xl bg-white border border-slate-200 p-7 sm:p-10 shadow-sm">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-950 mb-2">
                Project Scope Received
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{projectData.name}</strong>. We have received your inquiry for <strong>{projectData.platform}</strong>. We will get in touch with you at <strong>{projectData.email}</strong> within 4 business hours.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Link
                  to="/"
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs transition-colors"
                >
                  Return to Home
                </Link>
                <a
                  href="https://wa.me/916205947359?text=Hi%20Webory,%20I%20just%20submitted%20a%20project%20brief!"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors shadow-sm"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-slate-950">Select Target Platform</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      { id: 'Web Application', desc: 'Custom website, SaaS, or web platform', icon: Globe },
                      { id: 'Mobile App', desc: 'iOS and Android mobile application', icon: Smartphone },
                      { id: 'AI & Automation', desc: 'Custom AI integration or automation', icon: Bot },
                      { id: 'Full Ecosystem', desc: 'Combined Web, Mobile and Backend suite', icon: Layers }
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setProjectData({ ...projectData, platform: item.id })}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            projectData.platform === item.id
                              ? 'bg-blue-50/80 border-blue-600 shadow-sm'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <Icon className={`w-5 h-5 mb-2 ${projectData.platform === item.id ? 'text-blue-600' : 'text-slate-500'}`} />
                          <h4 className="text-sm font-semibold text-slate-950">{item.id}</h4>
                          <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 transition-colors shadow-sm"
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-slate-950">Timeline & Budget</h3>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 block">
                      Target Launch Window
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {['2 - 4 weeks', '4 - 8 weeks', '3+ Months'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setProjectData({ ...projectData, timeline: t })}
                          className={`p-2.5 rounded-xl text-xs font-medium border transition-colors ${
                            projectData.timeline === t
                              ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold shadow-sm'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 block">
                      Estimated Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {['<₹3,000', '₹3,000 - ₹8,000', '₹8,000 - ₹15,000', '₹15,000+'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setProjectData({ ...projectData, budget: b })}
                          className={`p-2.5 rounded-xl text-xs font-medium border transition-colors ${
                            projectData.budget === b
                              ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold shadow-sm'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 transition-colors shadow-sm"
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-950">Contact Information</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={projectData.name}
                        onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                        placeholder="Rahul Sharma"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={projectData.email}
                        onChange={(e) => setProjectData({ ...projectData, email: e.target.value })}
                        placeholder="rahul@company.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={projectData.phone}
                      onChange={(e) => setProjectData({ ...projectData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Brief Description of Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={projectData.description}
                      onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                      placeholder="Give us a summary of key features..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 transition-colors shadow-sm"
                    >
                      Submit Brief <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
