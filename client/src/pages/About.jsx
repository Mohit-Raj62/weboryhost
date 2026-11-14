import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Users,
  Mail,
  Phone,
  CheckCircle,
  HeartHandshake
} from 'lucide-react';

const About = () => {
  const team = [
    {
      name: "Mohit Sinha",
      role: "Founder & CEO",
      avatarEmoji: "👨‍💼",
      bio: "Visionary engineering leader and CTO driving system architecture, scalable cloud systems, and web innovation. Passionate about building robust, high-performance digital products.",
      skills: ["Cloud Architecture", "Full-Stack Engineering", "Tech Strategy"],
      email: "singm2698@gmail.com",
      phone: "+91-62059 47359"
    },
    {
      name: "Ridhima Singh",
      role: "HR , Lead UI/UX ",
      avatarEmoji: "👩‍🎨",
      bio: "Specializes in crafting intuitive user interfaces, design systems, and conversion-focused user journeys that connect brands authentically with their audiences.",
      skills: ["Design Systems", "Figma", "User Research"],
      email: "[EMAIL_ADDRESS]",
      phone: "+91-94734 71153"
    }
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: "Clean Code & Security First",
      desc: "Every line of code is written with rigorous type safety, modular design patterns, and enterprise-grade data protection."
    },
    {
      icon: Zap,
      title: "Measurable Performance",
      desc: "Sub-second load times, 98+ Google Lighthouse scores, and optimized asset delivery out of the box."
    },
    {
      icon: Target,
      title: "Commercial Alignment",
      desc: "We don't build software just for tech's sake. Every feature maps directly to customer conversion and business ROI."
    },
    {
      icon: HeartHandshake,
      title: "Transparent Collaboration",
      desc: "Direct communication with engineers, regular progress demos, and 100% intellectual property ownership."
    }
  ];

  const milestones = [
    { year: "2023", title: "Inception & Genesis", desc: "Webory was founded to deliver high-quality, modern web and software engineering to ambitious startups." },
    { year: "2024", title: "Full-Stack & Mobile Growth", desc: "Expanded core capabilities into cross-platform Flutter/React Native and custom API microservices." },
    { year: "2025", title: "100+ Deliveries Milestone", desc: "Crossed 100+ production platform deployments with high client retention across healthcare, commerce, and services." },
    { year: "2026", title: "Advanced Web & Automation", desc: "Engineering scalable web platforms, automation workflows, and modern cloud architectures." }
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen">
      {/* Hero */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          ABOUT WEBORY
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 max-w-3xl mx-auto mt-2 leading-tight">
          Engineering High-Quality <span className="text-blue-600">Digital Solutions.</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          We are a dedicated team of software architects, web engineers, and product designers committed to turning product ideas into scalable digital reality.
        </p>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div>
            <div className="text-3xl font-extrabold text-slate-950">150+</div>
            <div className="text-xs text-slate-500 mt-1">Shipped Projects</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-blue-600">99.8%</div>
            <div className="text-xs text-slate-500 mt-1">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-950">5+</div>
            <div className="text-xs text-slate-500 mt-1">Hub Locations</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-emerald-600">10x</div>
            <div className="text-xs text-slate-500 mt-1">Average Client ROI</div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">OUR CORE VALUES</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
            Built On Sound Engineering Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => {
            const VIcon = v.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 text-blue-600">
                  <VIcon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">TEAM LEADERSHIP</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
            Meet Our Core Team
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden shadow-sm"
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl mb-4">
                  {member.avatarEmoji}
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {member.name}
                </h3>
                <div className="text-xs font-medium text-blue-600 mt-0.5">{member.role}</div>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  {member.bio}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {member.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <a
                  href={`mailto:${member.email}`}
                  className="hover:text-blue-600 flex items-center gap-1 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
                <a
                  href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-blue-600 flex items-center gap-1 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" /> Call
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-200">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">OUR JOURNEY</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Company Milestones
          </h2>
        </div>

        <div className="space-y-4">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white border border-slate-200 flex items-start gap-4 shadow-sm"
            >
              <span className="text-xl font-bold text-blue-600 font-mono w-14 flex-shrink-0">
                {m.year}
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{m.title}</h3>
                <p className="text-xs text-slate-600 mt-1">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 text-center border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">
          Looking for a dependable software engineering partner?
        </h2>
        <div className="mt-5 flex justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            Start A Conversation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
