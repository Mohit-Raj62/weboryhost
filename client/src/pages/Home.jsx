import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Code2,
  Smartphone,
  Palette,
  Bot,
  Zap,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  ChevronRight,
  Star,
  CheckCircle,
  Play,
  X,
  Globe,
  Sliders,
  HelpCircle,
  ChevronDown,
  Activity
} from 'lucide-react';
import MacbookScroll from '../components/MacbookScroll';

const Home = () => {
  const [activeTab, setActiveTab] = useState('web');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectFilter, setProjectFilter] = useState('All');
  const [videoFilter, setVideoFilter] = useState('All');
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const [calcPlatform, setCalcPlatform] = useState('web');
  const [calcTier, setCalcTier] = useState('growth');
  const [calcFeatures, setCalcFeatures] = useState(['auth', 'database']);
  const [activeFaq, setActiveFaq] = useState(0);

  // Typewriter rotating terms matching TechServeNexus pattern
  const typewriterWords = [
    { text: 'Custom Software (HRMS, ERP, IMS, etc)', color: 'text-rose-600' },
    { text: 'IoT & Smart Devices', color: 'text-sky-600' },
    { text: 'Web & Mobile Applications', color: 'text-blue-600' },
    { text: 'AI & Automation Platforms', color: 'text-emerald-600' },
    { text: 'Scalable Cloud Infrastructure', color: 'text-amber-600' },
    { text: 'High-Converting E-Commerce', color: 'text-indigo-600' }
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  useEffect(() => {
    const currentWord = typewriterWords[textIndex].text;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setCurrentText(currentWord.substring(0, currentText.length + 1));

        if (currentText.length + 1 === currentWord.length) {
          setIsDeleting(true);
          setTypingSpeed(2200); // Hold full word
        } else {
          setTypingSpeed(70);
        }
      } else {
        // Backspacing
        setCurrentText(currentWord.substring(0, currentText.length - 1));

        if (currentText.length - 1 <= 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % typewriterWords.length);
          setTypingSpeed(450); // Short pause before next phrase
        } else {
          setTypingSpeed(32);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, textIndex, typingSpeed]);

  const techStack = [
    { name: 'Next.js 15', icon: '⚡' },
    { name: 'React 19', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'Flutter', icon: '💙' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'AWS Cloud', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'Redis', icon: '🔴' }
  ];

  const features = [
    {
      title: 'Full-Stack Web Engineering',
      desc: 'Next.js, React, Node.js and scalable microservices architected for blazing load speeds and 99.9% uptime SLAs.',
      icon: Code2,
      tags: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
      colSpan: 'lg:col-span-2'
    },
    {
      title: 'AI & Automation Solutions',
      desc: 'Integrating custom AI workflows, smart document assistants, and task automation to save operational hours.',
      icon: Bot,
      tags: ['OpenAI', 'Python', 'FastAPI', 'Workflows'],
      colSpan: 'lg:col-span-1'
    },
    {
      title: 'Mobile App Development',
      desc: 'Native-feel iOS and Android applications developed using Flutter and React Native with offline sync and clean UX.',
      icon: Smartphone,
      tags: ['Flutter', 'React Native', 'iOS', 'Android'],
      colSpan: 'lg:col-span-1'
    },
    {
      title: 'UI/UX & Product Design',
      desc: 'Clean, user-centric interfaces designed in Figma that are easy to navigate and built to convert visitors into customers.',
      icon: Palette,
      tags: ['Figma', 'Wireframing', 'Design Systems', 'Prototypes'],
      colSpan: 'lg:col-span-2'
    },
    {
      title: 'Cloud Infrastructure & DevOps',
      desc: 'Secure hosting, automatic scaling on AWS, database backups, and CI/CD deployment pipelines.',
      icon: Cpu,
      tags: ['AWS', 'Docker', 'CI/CD', 'Security'],
      colSpan: 'lg:col-span-3'
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'Vedartava Health Ecosystem',
      category: 'Web Engineering',
      desc: 'Teleconsultation and digital healthcare platform serving 250,000+ patients with real-time appointment booking.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      tags: ['React', 'Node.js', 'WebRTC', 'MongoDB'],
      metric: '+280% Patient Engagement',
      client: 'Vedartava Healthcare',
      youtubeId: 'o5wPNspNs40'
    },
    {
      id: 2,
      title: 'Altrim Automotive Portal',
      category: 'Enterprise',
      desc: 'Digital showroom and inventory management platform for modern automotive dealerships.',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
      tags: ['Next.js', 'Tailwind', 'REST API'],
      metric: '0.4s Fast Load Time',
      client: 'Altrim Motors',
      youtubeId: 'S40wGYMeYTI'
    },
    {
      id: 3,
      title: 'PrintMine B2B Custom Commerce',
      category: 'E-Commerce',
      desc: 'Dynamic design studio and mass-customization print engine processing 10,000+ monthly orders.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80',
      tags: ['React', 'Fabric.js', 'AWS', 'PostgreSQL'],
      metric: '10x Faster Order Flow',
      client: 'PrintMine.in',
      youtubeId: 'U5SDL5gajGM'
    },
    {
      id: 4,
      title: 'Relwani Automotives SaaS',
      category: 'Enterprise',
      desc: 'Service booking and workshop management workflow automating workshop telematics and inventory.',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80',
      tags: ['Flutter', 'Node.js', 'Docker'],
      metric: '99% Booking Automation',
      client: 'Relwani Group',
      youtubeId: '_oyFj_pqOoo'
    },
    {
      id: 5,
      title: 'NovaSync AI Document Workflow',
      category: 'AI & Automation',
      desc: 'Document intelligence and semantic extraction dashboard for enterprise data workflows.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      tags: ['Python', 'FastAPI', 'OpenAI'],
      metric: '94% Document Speedup',
      client: 'NovaSync Labs',
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      id: 6,
      title: 'Apex Global Logistics Cloud',
      category: 'Web Engineering',
      desc: 'Real-time telemetry, routing engine and container tracking portal across 40 shipping terminals.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
      tags: ['Next.js', 'Tailwind', 'Go', 'Redis'],
      metric: 'Sub-second GPS Tracking',
      client: 'Apex Freight',
      youtubeId: 'dQw4w9WgXcQ'
    }
  ];

  const filteredProjects = projectFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === projectFilter);

  const videoReels = [
    {
      id: 'webory-erp-hrms',
      title: 'Webory Enterprise ERP & HRMS Suite',
      client: 'Webory Technologies',
      category: 'Enterprise SaaS',
      youtubeId: 'VR0OJwVJcdQ',
      duration: '2:15',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      desc: 'Complete overview of the modular enterprise resource planning and human capital management suite with real-time analytics.'
    },
    {
      id: 'novapay-mobile',
      title: 'NovaPay Cross-Platform Fintech App',
      client: 'NovaPay Global',
      category: 'Mobile Engineering',
      youtubeId: '5qap5aO4i9A',
      duration: '1:50',
      thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
      desc: 'Native iOS and Android digital banking and wallet application built with Flutter and biometric security.'
    },
    {
      id: 'aether-commerce',
      title: 'AetherCommerce 3D Headless Storefront',
      client: 'Aether Retail',
      category: 'E-Commerce',
      youtubeId: 'U5SDL5gajGM',
      duration: '2:05',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      desc: 'Next.js 15 powered ultra-fast headless shopping platform with dynamic 3D product customization.'
    },
    {
      id: 'pulse-ai-hub',
      title: 'PulseAI Autonomous Document & Workflow Engine',
      client: 'Pulse Intelligence',
      category: 'AI & Automation',
      youtubeId: 'S40wGYMeYTI',
      duration: '1:35',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      desc: 'Automating multi-step enterprise workflows, contract extractions, and semantic knowledge retrieval with custom LLM agents.'
    },
    {
      id: 'logix-telematics',
      title: 'LogixPulse Fleet & Telemetry Cloud',
      client: 'Logix Global',
      category: 'Cloud Solutions',
      youtubeId: '_oyFj_pqOoo',
      duration: '2:40',
      thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
      desc: 'Real-time GPS telemetry, cold-chain temperature monitoring, and dispatch optimization across 500+ commercial vehicles.'
    },
    {
      id: 'medix-pro-health',
      title: 'MedixPro Telemedicine & Clinical Portal',
      client: 'Medix Health Systems',
      category: 'Web Engineering',
      youtubeId: 'o5wPNspNs40',
      duration: '2:20',
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      desc: 'HIPAA-compliant telemedicine platform with WebRTC encrypted video consultations, digital prescriptions, and patient EHR.'
    }
  ];

  const processSteps = [
    {
      num: '01',
      title: 'Discovery & Scope',
      desc: 'We map requirements, analyze technical constraints, and define measurable deliverables before coding.',
      icon: HelpCircle
    },
    {
      num: '02',
      title: 'Architecture & Design',
      desc: 'Interactive Figma design prototypes, database schemas, and API contracts reviewed with your team.',
      icon: Palette
    },
    {
      num: '03',
      title: 'Agile Development',
      desc: 'Rapid 2-week sprints with staging server previews, so you track progress in real time.',
      icon: Code2
    },
    {
      num: '04',
      title: 'Testing & Hardening',
      desc: 'Automated tests, speed optimization, and cross-browser quality assurance across devices.',
      icon: ShieldCheck
    },
    {
      num: '05',
      title: 'Deployment & SLA',
      desc: 'Zero-downtime production deployment, DNS setup, and 45 days of comprehensive warranty support.',
      icon: Zap
    }
  ];

  const testimonials = [
    {
      quote: "Webory delivered our telemedicine application ahead of schedule. The platform handles thousands of patients daily without hiccups. Highly recommended.",
      author: "Dr. Ananya Sharma",
      role: "Head of Operations",
      company: "Vedartava Health",
      rating: 5
    },
    {
      quote: "The team is professional, responsive, and truly understands modern web engineering. They felt like an extension of our in-house engineering team.",
      author: "Kunal Relwani",
      role: "Managing Director",
      company: "Relwani Automotives",
      rating: 5
    },
    {
      quote: "We needed a custom design customizer that could handle high concurrency. Webory executed the project with clean code and zero issues.",
      author: "Sameer Joshi",
      role: "Product Lead",
      company: "PrintMine.in",
      rating: 5
    }
  ];

  const faqs = [
    {
      q: 'How long does it take to build a custom website or application?',
      a: 'Most standard web platforms take between 3 to 6 weeks. Larger enterprise platforms or complex mobile apps typically take 6 to 10 weeks with clear sprint milestones.'
    },
    {
      q: 'Do we own 100% of the code and designs?',
      a: 'Yes, 100%. Upon project completion and handover, you receive full ownership of the source code, design assets, and cloud configurations with zero vendor lock-in.'
    },
    {
      q: 'Can you build both mobile apps and web platforms together?',
      a: 'Yes. We frequently build unified web platforms (Next.js/React) and mobile applications (Flutter/React Native) sharing the same backend database and APIs.'
    },
    {
      q: 'What kind of support do you provide after launch?',
      a: 'We provide 45 days of free post-launch support and warranty for all projects, plus ongoing maintenance packages for server monitoring, backups, and feature iterations.'
    }
  ];

  const baseCost = calcPlatform === 'web' ? 999 : calcPlatform === 'mobile' ? 1499 : calcPlatform === 'ai' ? 1799 : 2499;
  const tierMultiplier = calcTier === 'starter' ? 1 : calcTier === 'growth' ? 1.6 : 2.5;
  const featureCost = calcFeatures.length * 350;
  const estimatedCost = Math.round((baseCost * tierMultiplier + featureCost) / 100) * 100;
  const estimatedWeeks = calcTier === 'starter' ? '3-4' : calcTier === 'growth' ? '5-7' : '8-10';

  const toggleFeature = (id) => {
    if (calcFeatures.includes(id)) {
      setCalcFeatures(calcFeatures.filter(f => f !== id));
    } else {
      setCalcFeatures([...calcFeatures, id]);
    }
  };

  return (
    <div className="relative bg-[#f8fafc] text-slate-900">
      {/* Hero Section matching TechServeNexus 2-column layout & dynamic typewriter */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline with Typewriter, Subtitle, Bullets, CTAs, Stats */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>The Future of Digital Experience</span>
            </div>

            {/* Main Headline with Typewriter Effect */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-slate-950 leading-[1.18] min-h-[170px] sm:min-h-[200px] lg:min-h-[220px] flex flex-col justify-center">
              <span>We Build</span>
              <span className={`block font-extrabold transition-colors duration-200 ${typewriterWords[textIndex].color}`}>
                {currentText}
                <span className="inline-block w-[3px] h-[0.85em] bg-blue-600 ml-1.5 align-middle animate-pulse"></span>
              </span>
              <span>That Drive Results</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
              From premium websites and mobile apps to cloud infrastructure and digital marketing — we provide end-to-end tech and non-tech solutions to scale your business.
            </p>

            {/* Category Bullets matching screenshot */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-medium text-slate-600 pt-1">
              <span className="flex items-center gap-1.5"><span className="text-blue-600 font-bold">•</span> Web Development</span>
              <span className="flex items-center gap-1.5"><span className="text-blue-600 font-bold">•</span> Mobile Apps</span>
              <span className="flex items-center gap-1.5"><span className="text-blue-600 font-bold">•</span> UI/UX Design</span>
              <span className="flex items-center gap-1.5"><span className="text-blue-600 font-bold">•</span> Cloud Solutions</span>
              <span className="flex items-center gap-1.5"><span className="text-blue-600 font-bold">•</span> SEO & Marketing</span>
              <span className="flex items-center gap-1.5"><span className="text-blue-600 font-bold">•</span> Consulting</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-md group"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-sm font-medium transition-colors shadow-sm"
              >
                <Layers className="w-4 h-4 text-blue-600" />
                See Showcase
              </a>
            </div>

            {/* Stats Row */}
            <div className="pt-8 border-t border-slate-200 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-950">150+</div>
                <div className="text-xs text-slate-500 mt-0.5">Projects Done</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-950">120+</div>
                <div className="text-xs text-slate-500 mt-0.5">Happy Clients</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">100%</div>
                <div className="text-xs text-slate-500 mt-0.5">Satisfaction</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Mockup Showcase matching photo */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Ambient glow */}
            <div className="absolute -inset-4 bg-blue-500/10 rounded-3xl blur-2xl pointer-events-none"></div>

            {/* Floating Code Snippet Card (top-left) */}
            <div className="absolute -top-6 -left-4 sm:-left-8 z-20 p-3.5 rounded-xl bg-[#090d16]/95 border border-gray-700/80 shadow-2xl font-mono text-xs text-gray-300 backdrop-blur-md hidden sm:block">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              </div>
              <div className="space-y-0.5">
                <div><span className="text-blue-400">const</span> app = <span className="text-amber-400">createApp</span>()</div>
                <div><span className="text-blue-400">await</span> app.<span className="text-amber-400">deploy</span>(<span className="text-emerald-400">'prod'</span>)</div>
                <div className="text-emerald-400 font-semibold pt-1 flex items-center gap-1">
                  <span>✓</span> Live in 2.3s
                </div>
              </div>
            </div>

            {/* Floating Scale Badge (top-right) */}
            <div className="absolute -top-4 -right-2 sm:-right-4 z-20 px-3 py-2 rounded-xl bg-white border border-slate-200 shadow-xl flex items-center gap-2.5 backdrop-blur-md">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold text-xs">
                ↗
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  +127% <span className="text-[10px] text-slate-500 font-normal">growth</span>
                </div>
                <div className="flex items-center gap-0.5 mt-0.5">
                  <span className="w-1 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="w-1 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="w-1 h-3 rounded-full bg-emerald-500"></span>
                  <span className="w-1 h-4 rounded-full bg-emerald-600"></span>
                  <span className="w-1 h-2.5 rounded-full bg-emerald-500"></span>
                </div>
              </div>
            </div>

            {/* Main Dashboard Preview Card */}
            <div className="relative rounded-2xl bg-[#0d1322] border border-gray-800 shadow-2xl p-5 sm:p-6 overflow-hidden">
              {/* Window Topbar */}
              <div className="flex items-center justify-between pb-3.5 border-b border-gray-800/80">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                </div>
                <div className="text-[10px] font-mono text-gray-400 flex items-center gap-1">
                  <span>USERS | LAST 7 DAYS USING MEDIAN</span>
                  <ChevronDown className="w-3 h-3 text-gray-500" />
                </div>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3.5">
                <div className="p-2 rounded-lg bg-gray-900/60 border border-gray-800/80">
                  <div className="text-[9px] text-gray-400">Active Nodes</div>
                  <div className="text-sm font-bold text-white mt-0.5">2,840</div>
                </div>
                <div className="p-2 rounded-lg bg-gray-900/60 border border-gray-800/80">
                  <div className="text-[9px] text-gray-400">Response</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">18 ms</div>
                </div>
                <div className="p-2 rounded-lg bg-gray-900/60 border border-gray-800/80">
                  <div className="text-[9px] text-gray-400">Uptime SLA</div>
                  <div className="text-sm font-bold text-blue-400 mt-0.5">99.98%</div>
                </div>
                <div className="p-2 rounded-lg bg-gray-900/60 border border-gray-800/80">
                  <div className="text-[9px] text-gray-400">Requests</div>
                  <div className="text-sm font-bold text-white mt-0.5">4.8M</div>
                </div>
              </div>

              {/* Visual Chart Graphic with SVG */}
              <div className="mt-3 pt-1">
                <div className="h-28 sm:h-32 w-full flex items-end gap-1.5 sm:gap-2 px-1">
                  {[42, 58, 45, 68, 85, 92, 74, 88, 95, 60, 72, 89, 98, 80, 94].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                      <div 
                        className={`w-full rounded-t transition-all duration-500 ${
                          idx === 12 
                            ? 'bg-blue-500 shadow-md shadow-blue-500/50' 
                            : idx % 2 === 0 
                            ? 'bg-sky-500/70 hover:bg-sky-400' 
                            : 'bg-blue-600/50 hover:bg-blue-500'
                        }`}
                        style={{ height: `${val}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="w-full h-px bg-gray-800 mt-1"></div>
              </div>

              {/* Bottom Metrics Pills matching photo */}
              <div className="mt-3.5 pt-3 border-t border-gray-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                <span className="text-cyan-400 font-bold">2.7Mops</span>
                <span className="text-purple-400 font-bold">40.6%</span>
                <span className="text-emerald-400 font-bold">479K</span>
                <span className="text-amber-400 font-bold">17min</span>
                <span className="text-blue-400 font-bold">2yrs</span>
              </div>
            </div>

            {/* Floating Brand Badge (bottom-right) matching photo */}
            <div className="absolute -bottom-5 -right-2 sm:-right-4 z-20 px-3.5 py-2.5 rounded-2xl bg-[#090d16]/95 border border-gray-700 shadow-2xl flex items-center gap-2.5 backdrop-blur-md">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md">
                W
              </div>
              <div>
                <div className="text-[11px] font-black text-white tracking-widest uppercase">WEBORY</div>
                <div className="text-[8px] text-gray-400 uppercase tracking-wider font-mono">NEXUS SYSTEM</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          3D MACBOOK SCROLL PRESENTATION (Matching TechServeNexus)
      ========================================================================== */}
      <MacbookScroll
        title="Turning Imagination Into Reality"
      />

      {/* =========================================================================
          TECH STACK MARQUEE
      ========================================================================== */}
      <section className="py-8 border-y border-slate-200 bg-slate-100/70 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-3 text-center">
          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
            Technologies We Master & Build With
          </p>
        </div>
        <div className="flex overflow-hidden select-none">
          <div className="flex shrink-0 animate-marquee items-center gap-6 py-2">
            {[...techStack, ...techStack].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium whitespace-nowrap shadow-xs"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BENTO GRID CAPABILITIES & FEATURES
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            OUR CORE EXPERTISE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Complete Digital Solutions For Your Business
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            From single landing pages to scalable web platforms and mobile apps, our team delivers high-quality engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className={`rounded-2xl p-7 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all shadow-sm ${item.colSpan}`}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5">
                  <IconComp className="w-5 h-5" />
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          FEATURED PROJECTS & PORTFOLIO
      ========================================================================== */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              OUR PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Recent Case Studies & Work
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-xl">
              A sample of the digital platforms and web systems we have engineered for our clients.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', 'Web Engineering', 'Mobile Apps', 'AI & Automation', 'Enterprise'].map((cat) => (
              <button
                key={cat}
                onClick={() => setProjectFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                  projectFilter === cat
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xl overflow-hidden transition-all flex flex-col shadow-sm"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/95 text-slate-800 border border-slate-200 shadow-sm">
                    {project.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs font-medium text-emerald-700 bg-white/95 px-2.5 py-1 rounded-md border border-slate-200 shadow-sm">
                    ★ {project.metric}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-slate-500 font-medium">{project.client}</div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {project.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          CLIENT VIDEO WALKTHROUGHS & PRODUCT SHOWCASES (Matching TechServeNexus)
      ========================================================================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 overflow-hidden">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-semibold mb-4">
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Our Product Showcases</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight">
            Watch Our <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Latest Work</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Explore live product overviews, engineering walkthroughs, and custom software systems built by Webory Technologies.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {['All', 'Enterprise SaaS', 'Mobile Engineering', 'E-Commerce', 'AI & Automation', 'Cloud Solutions'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setVideoFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  videoFilter === cat
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Video Reel Showcase: Auto-scrolling Infinite Marquee (Paused on Hover) */}
        {videoFilter === 'All' ? (
          <div
            onMouseEnter={() => setIsMarqueePaused(true)}
            onMouseLeave={() => setIsMarqueePaused(false)}
            className="relative w-full overflow-hidden py-4 -mx-4 sm:-mx-6 lg:-mx-8"
          >
            <motion.div
              className="flex gap-6 w-max px-4 sm:px-6 lg:px-8"
              animate={isMarqueePaused ? {} : { x: ["0%", "-50%"] }}
              transition={{
                duration: 28,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {[...videoReels, ...videoReels].map((reel, idx) => (
                <div
                  key={`${reel.id}-${idx}`}
                  onClick={() => setSelectedVideo(reel)}
                  className="group cursor-pointer relative w-[300px] sm:w-[360px] lg:w-[400px] shrink-0 rounded-2xl bg-white border border-slate-200 hover:border-red-500/40 hover:shadow-xl transition-all duration-300 overflow-hidden shadow-sm flex flex-col"
                >
                  {/* Thumbnail / Video Preview */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <img
                      src={reel.thumbnail}
                      alt={reel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-115 transition-all">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    {/* Duration Badge */}
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 text-[10px] text-white font-mono font-medium tracking-wider">
                      {reel.duration}
                    </span>
                    {/* Category Tag */}
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-[10px] text-white font-semibold">
                      {reel.category}
                    </span>
                  </div>

                  {/* Video Meta Info */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <div className="text-[11px] font-bold text-red-600 uppercase tracking-wider mb-1">
                        {reel.client}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
                        {reel.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {reel.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span>Watch Full Demo</span>
                      <span className="text-red-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Play Video →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        ) : (
          /* Filtered Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoReels
              .filter((reel) => reel.category === videoFilter)
              .map((reel) => (
                <div
                  key={reel.id}
                  onClick={() => setSelectedVideo(reel)}
                  className="group cursor-pointer rounded-2xl bg-white border border-slate-200 hover:border-red-500/40 hover:shadow-xl transition-all duration-300 overflow-hidden shadow-sm flex flex-col"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <img
                      src={reel.thumbnail}
                      alt={reel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-115 transition-all">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 text-[10px] text-white font-mono font-medium">
                      {reel.duration}
                    </span>
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-[10px] text-white font-semibold">
                      {reel.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-red-600 uppercase tracking-wider mb-1">
                        {reel.client}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                        {reel.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                        {reel.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span>Watch Full Demo</span>
                      <span className="text-red-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Play Video →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>

      {/* =========================================================================
          PROJECT COST ESTIMATOR
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="rounded-2xl p-8 sm:p-12 bg-white border border-slate-200 shadow-md">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              PROJECT ESTIMATOR
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Estimate Your Project Scope
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Select your platform and features to get an instant scope estimate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-800 mb-2.5 block">
                  1. Target Platform
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'web', name: 'Web App', icon: Globe },
                    { id: 'mobile', name: 'Mobile App', icon: Smartphone },
                    { id: 'ai', name: 'AI Solution', icon: Bot },
                    { id: 'full', name: 'Web + Mobile', icon: Layers }
                  ].map((p) => {
                    const PIcon = p.icon;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setCalcPlatform(p.id)}
                        className={`p-3 rounded-lg text-left border transition-colors ${
                          calcPlatform === p.id
                            ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <PIcon className="w-4 h-4 text-blue-600 mb-1.5" />
                        <div className="text-xs font-bold">{p.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-800 mb-2.5 block">
                  2. Project Stage
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'starter', label: 'Starter MVP', desc: 'Fast initial launch' },
                    { id: 'growth', label: 'Standard Growth', desc: 'Full custom features' },
                    { id: 'enterprise', label: 'Enterprise Scale', desc: 'High concurrency SLA' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setCalcTier(t.id)}
                      className={`p-3 rounded-lg text-left border transition-colors ${
                        calcTier === t.id
                          ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-xs font-bold">{t.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-800 mb-2.5 block">
                  3. Select Features
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'auth', label: 'User Auth & Roles' },
                    { id: 'payments', label: 'Payment Gateway' },
                    { id: 'ai-bot', label: 'AI Assistant / Bot' },
                    { id: 'database', label: 'Custom Database' },
                    { id: 'realtime', label: 'Real-Time Chat' },
                    { id: 'analytics', label: 'Custom Analytics' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => toggleFeature(f.id)}
                      className={`p-2.5 rounded-lg text-left text-xs font-medium border flex items-center justify-between transition-colors ${
                        calcFeatures.includes(f.id)
                          ? 'bg-blue-50 border-blue-600 text-blue-900 font-semibold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{f.label}</span>
                      {calcFeatures.includes(f.id) ? (
                        <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-300"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Estimate Card */}
            <div className="p-6 rounded-xl bg-slate-900 text-white border border-slate-800 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider font-semibold">
                  ESTIMATE SUMMARY
                </span>
                <div className="text-xl font-bold text-white mt-1">
                  Estimated Investment
                </div>

                <div className="my-5 p-4 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400">Budget Range</div>
                  <div className="text-3xl font-bold text-white mt-1 font-mono">
                    ₹{estimatedCost.toLocaleString()} <span className="text-xs text-slate-400 font-normal">INR</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-2 font-mono">
                    Est. Timeline: <strong className="text-white">{estimatedWeeks} weeks</strong>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400" /> 100% Code Ownership
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400" /> Dedicated Technical Lead
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400" /> 45-Day Warranty Support
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <Link
                  to={`/contact?platform=${calcPlatform}&budget=${estimatedCost}`}
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-center text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  Discuss This Scope <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PROVEN PROCESS
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            HOW WE WORK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Our 5-Step Delivery Process
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {processSteps.map((step, idx) => {
            const SIcon = step.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="text-2xl font-bold text-blue-600 font-mono mb-3">
                    {step.num}
                  </div>
                  <SIcon className="w-5 h-5 text-slate-700 mb-2.5" />
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          TESTIMONIALS
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            CLIENT FEEDBACK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex gap-1 mb-3 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="text-sm font-semibold text-slate-900">{t.author}</div>
                <div className="text-xs text-slate-500">
                  {t.role}, <span className="text-blue-600 font-medium">{t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          FAQ
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-slate-200">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-white border border-slate-200 shadow-xs overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-900 hover:text-blue-600 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    activeFaq === idx ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-semibold text-blue-600 uppercase">
              {selectedProject.category} Case Study
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              {selectedProject.title}
            </h2>
            <div className="text-xs text-slate-500 mt-0.5">Client: {selectedProject.client}</div>

            <div className="my-5 rounded-xl overflow-hidden h-56 bg-slate-100 border border-slate-200">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {selectedProject.desc}
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm"
              >
                Inquire Similar Solution
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl rounded-xl bg-white border border-slate-200 p-3 shadow-2xl">
            <div className="flex items-center justify-between p-2">
              <span className="text-sm font-semibold text-slate-900 truncate">{selectedVideo.title}</span>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden mt-2 bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
