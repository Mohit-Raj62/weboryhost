import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Smartphone,
  Palette,
  Bot,
  Search,
  Cloud,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const servicesData = [
    {
      id: 'web',
      category: 'web',
      title: 'Full-Stack Web Engineering',
      tagline: 'High-speed, scalable web platforms',
      icon: Code2,
      detailRoute: '/web-development',
      description: 'We build enterprise-grade web applications with Next.js, React, Node.js, and TypeScript, engineered for lightning-fast latency, high concurrent traffic, and effortless scalability.',
      features: [
        'Next.js 15 Server Components & Fast Edge Caching',
        'Headless API Architecture (REST, GraphQL, tRPC)',
        'Multi-Tenant & Relational Database Structures',
        'Sub-Second Page Load Optimization & 100 Core Web Vitals',
        'Role-Based Access Control (RBAC) & Secure Gateways'
      ],
      techStack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind', 'PostgreSQL', 'Redis'],
      deliverables: '3-6 weeks delivery • 100% Code Ownership'
    },
    {
      id: 'mobile',
      category: 'mobile',
      title: 'Mobile App Development',
      tagline: 'iOS & Android native and cross-platform apps',
      icon: Smartphone,
      detailRoute: '/app-development',
      description: 'Crafting responsive mobile applications with Flutter and React Native. Built with offline-first synchronization, push notification engines, and fluid micro-animations.',
      features: [
        'Single Codebase for High-Performance iOS & Android',
        'Offline-First Data Storage with SQLite Caching',
        'Hardware Integration (Biometrics, Camera, Geolocation)',
        'App Store & Play Store Submission Support',
        'Real-Time WebSocket & Push Notification Pipelines'
      ],
      techStack: ['Flutter', 'React Native', 'Dart', 'Swift', 'Kotlin', 'Firebase'],
      deliverables: '4-8 weeks delivery • Store deployment'
    },
    {
      id: 'design',
      category: 'design',
      title: 'UI/UX & Product Design',
      tagline: 'Clean, user-centric interface design',
      icon: Palette,
      detailRoute: '/web-design',
      description: 'We design intuitive, conversion-focused user interfaces and design systems in Figma that reduce user drop-off and compound brand trust.',
      features: [
        'Interactive High-Fidelity Figma Click-Through Prototypes',
        'Atomic Design Systems with Documented UI Token Libraries',
        'User Journey Mapping, Wireframes & Information Architecture',
        'Conversion Rate Optimization (CRO) & Usability Audits',
        'Developer Handover Specs with Pixel-Perfect Asset Exports'
      ],
      techStack: ['Figma', 'FigJam', 'Design Systems', 'Prototyping', 'Tokens'],
      deliverables: '2-4 weeks delivery • Figma source files'
    },
    {
      id: 'ai',
      category: 'ai',
      title: 'AI & Automation Solutions',
      tagline: 'Smart workflows and custom AI models',
      icon: Bot,
      detailRoute: '/services',
      description: 'Automate repetitive back-office operations and elevate client experiences using private LLM agents, RAG document search engines, and intelligent webhooks.',
      features: [
        'Retrieval-Augmented Generation (RAG) over Company Data',
        'Autonomous Multi-Agent Task Routing & Orchestration',
        'Custom Fine-Tuning & Prompt Architecture Pipelines',
        'Document Extraction (PDFs, Invoices, Contracts, Receipts)',
        'Enterprise Security, Zero-Leakage & GDPR Compliance'
      ],
      techStack: ['Python', 'FastAPI', 'OpenAI', 'LangChain', 'ChromaDB', 'Docker'],
      deliverables: '3-5 weeks delivery • API endpoints & docs'
    },
    {
      id: 'seo',
      category: 'web',
      title: 'SEO & Performance Engineering',
      tagline: 'Technical speed & search visibility',
      icon: Search,
      detailRoute: '/seo',
      description: 'Rank higher on Google searches with technical speed optimization, schema markup, semantic HTML, and lightning-fast Core Web Vitals.',
      features: [
        'Core Web Vitals Audit (LCP, FID, CLS, INP Optimization)',
        'Structured Schema.org JSON-LD Rich Snippet Integration',
        'Dynamic XML Sitemaps, Canonicalization & Robots Directives',
        'Keyword Strategy, On-Page Architecture & Semantic Silos',
        'Server-Side Rendering (SSR) & Dynamic Open Graph Metadata'
      ],
      techStack: ['Lighthouse', 'Google Search Console', 'Schema.org', 'Next.js SSR'],
      deliverables: 'Ongoing monthly sprints • Monthly reports'
    },
    {
      id: 'cloud',
      category: 'cloud',
      title: 'Cloud Infrastructure & DevOps',
      tagline: 'AWS architectures and CI/CD pipelines',
      icon: Cloud,
      detailRoute: '/consulting',
      description: 'Deploy resilient cloud infrastructure with automated autoscaling, database read-replicas, and continuous deployment pipelines.',
      features: [
        'AWS Cloud Infrastructure Design (ECS, RDS, S3, CloudFront)',
        'Automated CI/CD Pipelines via GitHub Actions & Docker',
        'Zero-Downtime Blue/Green Deployments',
        'Disaster Recovery & Distributed Backups',
        'Cloud Cost Optimization (saving 30-50% on AWS bills)'
      ],
      techStack: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform'],
      deliverables: 'Infrastructure as Code • CI/CD automation'
    }
  ];

  const filteredServices = activeCategory === 'all'
    ? servicesData
    : servicesData.filter(s => s.category === activeCategory);

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          TECHNICAL SERVICES
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 max-w-3xl mx-auto mt-2 leading-tight">
          Comprehensive Engineering For <span className="text-blue-600">Modern Businesses.</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          From full-stack web platforms and cross-platform mobile apps to automation workflows, we engineer digital products built for reliability and scale.
        </p>

        {/* Category Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Services' },
            { id: 'web', label: 'Web Engineering' },
            { id: 'mobile', label: 'Mobile Apps' },
            { id: 'ai', label: 'AI & Automations' },
            { id: 'design', label: 'UI/UX Design' },
            { id: 'cloud', label: 'Cloud & DevOps' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pb-20">
        {filteredServices.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-10 transition-colors shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-blue-600 uppercase tracking-wider font-semibold">
                        {service.tagline}
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mt-4">
                    {service.description}
                  </p>

                  <div className="mt-5 space-y-2">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between h-full">
                  <div>
                    <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
                      Core Technologies
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {service.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono px-2.5 py-1 rounded-md bg-white text-slate-700 border border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 mb-5">
                      <strong>Delivery Scope:</strong> {service.deliverables}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 mt-2">
                    <Link
                      to={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="flex-1 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      Inquire About Service <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to={service.detailRoute}
                      className="py-2.5 px-4 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-medium text-center transition-colors shadow-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Banner */}
      <section className="py-16 px-4 text-center border-t border-slate-200">
        <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Need a custom technical roadmap?
          </h2>
          <p className="mt-2 text-slate-600 text-sm">
            Our software leads are available for an initial discovery session with zero sales pressure.
          </p>
          <div className="mt-5 flex justify-center">
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
            >
              Book Discovery Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
