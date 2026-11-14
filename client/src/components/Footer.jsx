import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Send
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="relative bg-slate-50 border-t border-slate-200 pt-16 pb-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top CTA Banner */}
        <div className="rounded-2xl p-8 sm:p-10 mb-16 border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Ready to build your next web or mobile product?
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Partner with Webory to turn complex software challenges into scalable, high-converting digital products.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm"
              >
                Schedule Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/916205947359?text=Hi%20Webory,%20I'm%20interested%20in%20building%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-sm font-medium transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                WhatsApp Direct
              </a>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-200">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base">
                W
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Webory
              </span>
            </Link>

            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              We design, architect, and engineer digital experiences that empower modern enterprises. Innovate. Build. Scale.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              99.98% System Uptime
            </div>

            {/* Newsletter */}
            <div className="mt-2">
              <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
                Tech & Innovation Insights
              </div>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              {subscribed && (
                <div className="text-[11px] text-emerald-600 mt-1.5 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> You're subscribed!
                </div>
              )}
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <Link to="/web-development" className="hover:text-blue-600 transition-colors">
                  Web Applications
                </Link>
              </li>
              <li>
                <Link to="/app-development" className="hover:text-blue-600 transition-colors">
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link to="/web-design" className="hover:text-blue-600 transition-colors">
                  UI/UX & Product Design
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 transition-colors">
                  AI & Automations
                </Link>
              </li>
              <li>
                <Link to="/seo" className="hover:text-blue-600 transition-colors">
                  SEO & Performance
                </Link>
              </li>
              <li>
                <Link to="/consulting" className="hover:text-blue-600 transition-colors">
                  Cloud & IT Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <Link to="/about" className="hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/client" className="hover:text-blue-600 transition-colors">
                  Portfolio & Work
                </Link>
              </li>
              <li>
                <Link to="/career" className="hover:text-blue-600 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-blue-600 transition-colors">
                  Engineering Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-xs text-slate-500">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <a href="mailto:support@weboryskills.in" className="hover:text-slate-900 transition-colors">
                  support@weboryskills.in
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <a href="tel:+919473471153" className="hover:text-slate-900 transition-colors">
                  +91-94734 71153
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>
                  Office Dehradun utterakhand (248001) | Patna & Bihar 27
                </span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mt-5">
              <a
                href="https://www.linkedin.com/company/webory"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/webory"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/webory"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/webory"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Webory Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-slate-600 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-600 transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-slate-600 transition-colors">
              Cookie Policy
            </Link>
            <Link to="/admin/login" className="hover:text-slate-600 transition-colors opacity-70">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
