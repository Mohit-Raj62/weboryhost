import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Code2,
  Smartphone,
  Palette,
  Bot,
  Search,
  Cloud,
  User
} from 'lucide-react';

const servicesList = [
  {
    name: 'Web Engineering',
    desc: 'High-speed, scalable web apps & Next.js platforms',
    path: '/web-development',
    icon: Code2,
  },
  {
    name: 'Mobile App Development',
    desc: 'iOS & Android native and cross-platform apps',
    path: '/app-development',
    icon: Smartphone,
  },
  {
    name: 'UI/UX & Product Design',
    desc: 'Clean, modern, high-converting digital interfaces',
    path: '/web-design',
    icon: Palette,
  },
  {
    name: 'AI & Automations',
    desc: 'Intelligent workflows, LLM agents & smart systems',
    path: '/services',
    icon: Bot,
  },
  {
    name: 'SEO & Growth Engineering',
    desc: 'Organic search rankings and technical speed',
    path: '/seo',
    icon: Search,
  },
  {
    name: 'Cloud & IT Consulting',
    desc: 'Cloud infrastructure, AWS, DevOps & security',
    path: '/consulting',
    icon: Cloud,
  }
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'Portfolio', path: '/client' },
    { name: 'Careers', path: '/career' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3 transition-all duration-200">
      <div
        className={`max-w-7xl mx-auto rounded-xl border transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-gray-200 shadow-sm py-2.5 px-4 sm:px-6'
            : 'bg-white/85 backdrop-blur-sm border-gray-200/80 py-3 px-4 sm:px-6 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
              W
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Webory
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium -mt-1 hidden sm:block">
                Software & Web
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setServicesDropdown(true)}
                    onMouseLeave={() => setServicesDropdown(false)}
                  >
                    <button
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive(link.path) || servicesDropdown
                          ? 'text-blue-600 bg-blue-50/80 font-semibold'
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
                      }`}
                      onClick={() => setServicesDropdown(!servicesDropdown)}
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesDropdown ? 'rotate-180 text-blue-600' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Dropdown */}
                    {servicesDropdown && (
                      <div className="absolute top-full left-0 pt-2 w-[520px]">
                        <div className="p-3 rounded-xl bg-white border border-gray-200 shadow-xl grid grid-cols-2 gap-2">
                          {servicesList.map((srv) => {
                            const IconComponent = srv.icon;
                            return (
                              <Link
                                key={srv.name}
                                to={srv.path}
                                className="p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all flex items-start gap-2.5 group/item"
                              >
                                <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 mt-0.5">
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs font-semibold text-slate-900 group-hover/item:text-blue-600 transition-colors truncate">
                                    {srv.name}
                                  </div>
                                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                    {srv.desc}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}

                          <div className="col-span-2 mt-1 pt-2 border-t border-slate-100 flex items-center justify-between px-2">
                            <span className="text-[11px] text-slate-500">
                              Custom requirements?
                            </span>
                            <Link
                              to="/contact"
                              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                            >
                              Talk to our team <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-blue-600 bg-blue-50/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              to="/login"
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login</span>
            </Link>

            <Link
              to="/contact"
              className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-slate-950 hover:bg-slate-800 transition-all shadow-sm flex items-center gap-1.5 group"
            >
              <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform font-bold">&gt;</span>
              <span>Enquiry</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 z-50 rounded-xl bg-white border border-gray-200 p-5 shadow-2xl">
          <div className="flex flex-col gap-1.5">
            <Link
              to="/"
              className="p-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="p-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              About
            </Link>
            <Link
              to="/services"
              className="p-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              Services
            </Link>
            <Link
              to="/client"
              className="p-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              Portfolio
            </Link>
            <Link
              to="/career"
              className="p-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              Careers
            </Link>
            <Link
              to="/contact"
              className="p-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              Contact
            </Link>

            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/contact"
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-center text-sm"
              >
                Get In Touch
              </Link>
              <Link
                to="/login"
                className="w-full py-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900 text-center text-xs font-medium"
              >
                Client Portal Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
