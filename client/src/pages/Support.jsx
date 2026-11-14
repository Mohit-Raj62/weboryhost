import React from 'react';
import { Link } from 'react-router-dom';
import {
  Headphones,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

const Support = () => {
  return (
    <div className="relative overflow-hidden bg-[#f8fafc] text-slate-900 min-h-screen">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold mb-6">
          <Headphones className="w-3.5 h-3.5" /> 24/7 CLIENT SUPPORT & HELP DESK
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 max-w-4xl mx-auto leading-tight">
          Dedicated Technical Assistance Whenever{' '}
          <span className="text-blue-600">
            You Need It.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Immediate incident triage, bug escalation, infrastructure status, and engineering support directly from the architects who built your stack.
        </p>
      </section>

      {/* Support Channels */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-6">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Live WhatsApp Chat</h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Fastest response for quick questions, project updates, and urgent requests.
            </p>
          </div>
          <a
            href="https://wa.me/916205947359?text=Hi%20Webory%20Support,%20I%20need%20assistance%20with%20my%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs text-center block shadow-sm transition-all"
          >
            Start WhatsApp Chat
          </a>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-6">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Official Help Desk</h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Submit change requests, bug reports, and invoice inquiries directly to our engineering desk.
            </p>
          </div>
          <a
            href="mailto:supportwebory@gmail.com"
            className="mt-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-semibold text-xs text-center block transition-all"
          >
            supportwebory@gmail.com
          </a>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-6">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Direct Phone Line</h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Available 9:00 AM – 8:00 PM IST for immediate voice discussions with our founders.
            </p>
          </div>
          <a
            href="tel:+916205947359"
            className="mt-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs text-center block shadow-sm transition-all"
          >
            +91-62059 47359
          </a>
        </div>
      </section>

      {/* Ticket form link */}
      <section className="py-16 text-center">
        <div className="p-8 max-w-2xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">Need to open a detailed support ticket?</h3>
          <p className="text-xs text-slate-500 mt-2">
            You can also submit detailed logs, repro steps, and screenshots via our main inquiry desk.
          </p>
          <div className="mt-6">
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm inline-flex items-center gap-1.5"
            >
              Open Project Inquiry <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
