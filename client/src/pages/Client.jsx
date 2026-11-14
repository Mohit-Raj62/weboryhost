import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const Client = () => {
  const caseStudies = [
    {
      name: "Vedartava Health Ecosystem",
      industry: "Healthcare SaaS",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
      headline: "Scalable Telehealth Platform for 250,000+ Concurrent Patients",
      metric: "99.98% Uptime SLA",
      desc: "Architected a HIPAA-compliant multi-tenant consultation network with real-time WebRTC audio/video consultations, electronic health records (EHR) indexing, and sub-second prescription generation.",
      techStack: ["Next.js", "Node.js", "WebRTC", "PostgreSQL", "AWS ECS"],
      quote: "Webory turned our fragmented legacy clinic software into a high-concurrency cloud platform that seamlessly scaled during our peak traffic spikes.",
      author: "Dr. Ananya Sharma, Head of Digital Operations"
    },
    {
      name: "Altrim Automotive Portal",
      industry: "Automotive Marketplace",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
      headline: "Interactive 3D Virtual Showroom & Dealership Telemetry",
      metric: "+320% Digital Inquiries",
      desc: "Delivered a headless automotive marketplace featuring high-speed 3D vehicle customization, dealer inventory sync across 45 branches, and automated credit application routing.",
      techStack: ["Next.js 15", "Three.js", "Tailwind CSS", "Docker", "Redis"],
      quote: "The virtual showroom Webory engineered transformed our sales funnel. Customers configure cars interactively and book test drives 3x faster.",
      author: "Rohan Kapoor, Chief Marketing Officer"
    },
    {
      name: "PrintMine B2B Custom Commerce",
      industry: "Mass Customization",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
      headline: "In-Browser Vector Design Studio Processing 10,000+ Daily Orders",
      metric: "10x Faster Design Pipeline",
      desc: "Built a high-performance HTML5 Canvas customization editor enabling bulk merchandise personalization with instant CMYK print-ready PDF generation and automated factory dispatch.",
      techStack: ["React 19", "Fabric.js", "Go", "AWS S3", "Stripe API"],
      quote: "The in-browser vector engine operates smoothly even with heavy artwork layers. Webory's attention to performance engineering saved us months of rework.",
      author: "Sameer Joshi, Product Architect"
    },
    {
      name: "Relwani Automotives SaaS",
      industry: "Workshop Telematics",
      image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80",
      headline: "End-to-End Workshop Scheduling & Mobile Field Dispatch",
      metric: "99% Booking Automation",
      desc: "Engineered a cross-platform mobile suite for field mechanics coupled with a dispatch operations center that tracks parts inventory, job completion timers, and automated billing.",
      techStack: ["Flutter", "React", "Node.js", "MongoDB", "RabbitMQ"],
      quote: "Webory became an indispensable extension of our technical leadership. Their work on our dispatch engine revolutionized workshop turnaround times.",
      author: "Kunal Relwani, Managing Director"
    },
    {
      name: "NovaSync AI Intelligence",
      industry: "Enterprise AI & RAG",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      headline: "Autonomous Document Extraction & Semantic Policy Engine",
      metric: "94% Speedup in Underwriting",
      desc: "Implemented an isolated RAG pipeline utilizing private vector embeddings and LangChain agents to summarize complex multi-page financial audits and compliance filings.",
      techStack: ["Python", "FastAPI", "OpenAI", "ChromaDB", "Docker"],
      quote: "Our underwriters now parse complex filings in minutes rather than hours. Webory delivered a rock-solid, secure system with zero proprietary data exposure.",
      author: "Siddharth Verma, VP Artificial Intelligence"
    },
    {
      name: "Apex Global FinTech Engine",
      industry: "Algorithmic Wealth",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
      headline: "Biometric Wealth Management & Real-Time Portfolio Telemetry",
      metric: "99.99% Uptime",
      desc: "Institutional trading and wealth portal with real-time WebSockets, zero-latency price tickers, and automated risk reporting.",
      techStack: ["TypeScript", "Golang", "Redis", "Kafka"],
      quote: "Flawless execution on complex real-time WebSocket infrastructure. Their security audits gave our stakeholders complete confidence.",
      author: "Vikram Mehta, VP Technology"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-[#f8fafc] text-slate-900 min-h-screen">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      {/* Header */}
      <section className="pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" /> CLIENT PORTFOLIO & CASE STUDIES
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 max-w-4xl mx-auto leading-tight">
          Delivering High-Impact Systems For{' '}
          <span className="text-blue-600">
            Industry Leaders.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Explore how we partner with ambitious startups and established companies to solve critical engineering challenges and compound their business growth.
        </p>
      </section>

      {/* Case Studies */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {caseStudies.map((study, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-white border border-slate-200 hover:border-slate-300 p-8 sm:p-12 transition-all duration-300 shadow-sm hover:shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Image Column */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden h-72 sm:h-80 bg-slate-100 border border-slate-200 relative group">
              <img
                src={study.image}
                alt={study.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 border border-slate-200 shadow-sm">
                  {study.industry}
                </span>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="text-xs font-bold text-emerald-700 bg-white/95 px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                  ★ {study.metric}
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-blue-600 uppercase tracking-widest font-bold">
                  {study.name}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {study.headline}
                </h2>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  {study.desc}
                </p>

                <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 border-l-4 border-l-blue-600">
                  <p className="text-xs text-slate-700 italic">
                    "{study.quote}"
                  </p>
                  <div className="text-[11px] text-slate-500 mt-2 font-medium">
                    — {study.author}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {study.techStack.map(t => (
                    <span key={t} className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Inquire Similar Architecture <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center border-t border-slate-200">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          Ready to be our next flagship case study?
        </h2>
        <p className="mt-3 text-slate-600 text-sm max-w-xl mx-auto">
          Let’s discuss your technical challenges and engineer a scalable platform tailored specifically for your vision.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/contact"
            className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all"
          >
            Schedule Strategy Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Client;
