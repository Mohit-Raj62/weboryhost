import React, { useState, useEffect, useRef } from 'react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [ripples, setRipples] = useState([]);
  const dropdownRef = useRef(null);
  const navRef = useRef(null);
  const menuRef = useRef(null);

  // Handle scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Swipe gesture detection
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && isMenuOpen) {
      setIsMenuOpen(false);
    }
    if (isRightSwipe && !isMenuOpen) {
      setIsMenuOpen(true);
    }
  };

  // Ripple effect for touch feedback
  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    createRipple(e);
    setActiveDropdown(activeDropdown === 'services' ? null : 'services');
  };

  const handleMenuItemClick = (e) => {
    createRipple(e);
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const services = [
    { href: '/web-design', icon: '🎨', label: 'Web Design', description: 'Creative & modern designs' },
    { href: '/web-development', icon: '💻', label: 'Web Development', description: 'Full-stack solutions' },
    { href: '/app-development', icon: '📱', label: 'App Development', description: 'Mobile & desktop apps' },
    { href: '/seo', icon: '📈', label: 'SEO & Marketing', description: 'Boost your online presence' },
    { href: '/mlm', icon: '🔄', label: 'MLM Software', description: 'Network marketing tools' },
    { href: '/consulting', icon: '💡', label: 'IT Consulting', description: 'Strategic technology advice' },
    { href: '/maintenance', icon: '🔧', label: 'IT Maintenance', description: 'Keep systems running smooth' },
    { href: '/support', icon: '🎧', label: 'Technical Support', description: '24/7 expert assistance' }
  ];

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .navbar {
          background: ${scrollPosition > 50 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.98)'};
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 12px 24px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            0 2px 16px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: fixed;
          top: 16px;
          left: 16px;
          right: 16px;
          z-index: 1000;
          background-color:rgba(155, 205, 255, 0.95);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform: ${scrollPosition > 50 ? 'translateY(-2px)' : 'translateY(0)'};
        }
        
        .nav-brand {
          position: relative;
          z-index: 1001;
        }
        
        .nav-brand a {
          font-size: 28px;
          font-weight: 700;
          color: #1a202c;
          text-decoration: none;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .nav-brand a:hover {
          transform: scale(1.05);
        }
        
        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          cursor: pointer;
          z-index: 1001;
          padding: 0;
          // color:red;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .mobile-menu-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }
        
        .mobile-menu-btn:active {
          transform: scale(0.95);
        }
        
        .mobile-menu-btn span {
          display: block;
          height: 2px;
          width: 20px;
          background: #1a202c;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin: 2px 0;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
          transform: rotate(45deg) translate(4px, 4px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
          opacity: 0;
          transform: scale(0);
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
     
        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
          list-style: none;
        }
        
        .nav-link {
          color: #1a202c; 
          font-size: 21px;
          font-weight: 600;
          text-decoration: none;
          padding: 10px 16px;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .nav-link:hover {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          transform: translateY(-1px);
        }
        
        .dropdown {
          position: relative;
        }
        
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.1),
            0 8px 24px rgba(0, 0, 0, 0.08);
          min-width: 320px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px) scale(0.95);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          padding: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          max-height: 70vh;
          overflow-y: auto;
        }
        
        .dropdown.active .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
        }
        
        .dropdown-item {
          display: flex;
          align-items: center;
          padding: 16px;
          color: #1a202c;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 16px;
          margin: 4px 0;
          background: rgba(248, 250, 252, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.05);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(8px);
        }

        .dropdown-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(102, 126, 234, 0.1),
            transparent
          );
          transition: 0.5s;
        }
        
        .dropdown-item:hover::before {
          left: 100%;
        }
        
        .dropdown-item:hover {
          background: rgba(102, 126, 234, 0.1);
          transform: translateX(4px);
          border-color: rgba(102, 126, 234, 0.2);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }

        .dropdown-item:active {
          transform: scale(0.98) translateX(4px);
        }

        .dropdown-item-icon {
          font-size: 1.5rem;
          margin-right: 16px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(102, 126, 234, 0.1);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .dropdown-item:hover .dropdown-item-icon {
          background: rgba(102, 126, 234, 0.2);
          transform: scale(1.1);
        }

        .dropdown-item-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .dropdown-item-label {
          font-weight: 600;
          margin-bottom: 2px;
          color: #1a202c;
        }

        .dropdown-item-description {
          font-size: 0.875rem;
          color: #64748b;
          opacity: 0.8;
        }
        
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(102, 126, 234, 0.3);
          animation: ripple-animation 0.6s linear;
          pointer-events: none;
        }

        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @media (max-width: 1024px) {
          .navbar {
            padding: 10px 20px;
          }
          
          .nav-brand a {
            font-size: 24px;
          }
        }
        
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex;
          }
          
          .nav-links {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            height: 100vh;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            gap: 12px;
            z-index: 999;
            padding: 80px 20px 24px;
            overflow-y: auto;
            opacity: 0;
            visibility: hidden;
            transform: translateX(100%);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
            display: flex;
          }
          
          .nav-links.active {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
          }

          .nav-menu-header {
            text-align: center;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }

          .nav-menu-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 8px;
          }

          .nav-menu-subtitle {
            color: #64748b;
            font-size: 0.875rem;
          }
          
          .nav-link {
            font-size: 1.1rem;
            font-weight: 600;
            width: 100%;
            text-align: left;
            padding: 16px 20px;
            background: rgba(248, 250, 252, 0.8);
            border-radius: 16px;
            margin: 4px 0;
            opacity: 0;
            transform: translateX(30px);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            transition-delay: calc(0.1s * var(--index));
            cursor: pointer;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            border: 1px solid rgba(0, 0, 0, 0.05);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            gap: 12px;
            min-height: 56px;
          }

          .nav-link::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 4px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            transform: scaleY(0);
            transition: transform 0.3s ease;
          }

          .nav-link:hover::before {
            transform: scaleY(1);
          }
          
          .nav-links.active .nav-link {
            opacity: 1;
            transform: translateX(0);
          }

          .nav-link:hover {
            background: rgba(102, 126, 234, 0.1);
            transform: translateX(4px);
            border-color: rgba(102, 126, 234, 0.2);
            box-shadow: 0 4px 16px rgba(102, 126, 234, 0.15);
          }

          .nav-link:active {
            transform: scale(0.98) translateX(4px);
          }

          .nav-link-icon {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(102, 126, 234, 0.1);
            border-radius: 10px;
            font-size: 1.1rem;
            flex-shrink: 0;
          }
          
          .dropdown {
            width: 100%;
          }
          
          .dropdown-menu {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            background: rgba(248, 250, 252, 0.6);
            margin: 8px 0 0 0;
            display: none;
            width: 100%;
            box-shadow: none;
            border: 1px solid rgba(0, 0, 0, 0.08);
            padding: 12px;
            border-radius: 16px;
            backdrop-filter: blur(10px);
            max-height: none;
          }
          
          .dropdown.active .dropdown-menu {
            display: block;
            animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
              max-height: 0;
            }
            to {
              opacity: 1;
              transform: translateY(0);
              max-height: 600px;
            }
          }
          
          .dropdown-item {
            color: #1a202c;
            padding: 16px;
            margin: 6px 0;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 14px;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 1rem;
            opacity: 0;
            transform: translateX(20px);
            border: 1px solid rgba(0, 0, 0, 0.08);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            backdrop-filter: blur(8px);
            min-height: 64px;
          }
          
          .dropdown.active .dropdown-item {
            opacity: 1;
            transform: translateX(0);
            transition-delay: calc(0.05s * var(--index));
          }
          
          .dropdown-item:hover {
            background: rgba(102, 126, 234, 0.1);
            transform: translateX(4px);
            border-color: rgba(102, 126, 234, 0.2);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
          }

          .dropdown-item:active {
            transform: scale(0.98) translateX(4px);
          }

          .dropdown-item-icon {
            font-size: 1.25rem;
            margin-right: 0;
            width: 40px;
            height: 40px;
            flex-shrink: 0;
          }

          .dropdown-toggle-icon {
            margin-left: auto;
            font-size: 0.875rem;
            transition: transform 0.3s ease;
            flex-shrink: 0;
          }

          .dropdown.active .dropdown-toggle-icon {
            transform: rotate(180deg);
          }

          .mobile-swipe-indicator {
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.6);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.75rem;
            opacity: 0;
            animation: swipe-hint 3s ease-in-out infinite;
            z-index: 1001;
            backdrop-filter: blur(10px);
          }

          .nav-links.active .mobile-swipe-indicator {
            opacity: 1;
          }

          @keyframes swipe-hint {
            0%, 100% { opacity: 0; transform: translateX(-50%) translateY(10px); }
            50% { opacity: 1; transform: translateX(-50%) translateY(0); }
          }
        }
        
        @media (max-width: 480px) {
          .navbar {
            left: 12px;
            right: 12px;
            top: 12px;
            padding: 10px 16px;
          }

          .nav-links {
            padding: 70px 16px 16px;
          }

          .nav-menu-header {
            margin-bottom: 20px;
            padding-bottom: 12px;
          }

          .nav-menu-title {
            font-size: 1.25rem;
          }

          .nav-link {
            padding: 14px 16px;
            font-size: 1rem;
            min-height: 52px;
          }

          .nav-link-icon {
            width: 28px;
            height: 28px;
            font-size: 1rem;
          }

          .dropdown-menu {
            padding: 10px;
          }

          .dropdown-item {
            padding: 14px;
            min-height: 56px;
          }

          .dropdown-item-icon {
            width: 36px;
            height: 36px;
          }

          .dropdown-item-label {
            font-size: 0.95rem;
          }

          .dropdown-item-description {
            font-size: 0.8rem;
          }
        }

        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
          padding-top: 90px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .nav-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 998;
          backdrop-filter: blur(4px);
        }

        .nav-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Overlay for mobile menu */}
      <div 
        className={`nav-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <nav className="navbar" ref={navRef}>
        <div className="nav-brand">
          <a href="/" className="flex items-center h-8 sm:h-10 md:h-12 lg:h-12">
            {/* Mobile logo */}
            <img
              src="/web.png"
              alt="Webory Mobile Logo"
              className="block sm:hidden h-50  w-auto max-w-[71px]"
            />
            {/* Desktop/Tablet logo */}
            <img
              src="/exwayer.regular.webp"
              alt="Webory Logo"
              className="hidden sm:block h-8 md:h-12 lg:h-10 w-auto max-w-[160px] sm:max-w-[180px]"
            />
          </a>
        </div>

        <button 
          className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
          {ripples.map(ripple => (
            <span
              key={ripple.id}
              className="ripple"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          ))}
        </button>

        <div 
          className={`nav-links ${isMenuOpen ? 'active' : ''}`}
          ref={menuRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* <div className="nav-menu-header">
            <div className="nav-menu-title">Navigation</div>
            <div className="nav-menu-subtitle">Swipe left to close</div>
          </div> */}

          <a 
            href="/" 
            className="nav-link" 
            style={{"--index": 1}}
            onClick={handleMenuItemClick}
          >
            <span className="nav-link-icon">🏠</span>
            Home
          </a>
          
          <a 
            href="/about" 
            className="nav-link" 
            style={{"--index": 2}}
            onClick={handleMenuItemClick}
          >
            <span className="nav-link-icon">ℹ️</span>
            About Us
          </a>
          
          <div 
            className={`dropdown ${activeDropdown === 'services' ? 'active' : ''}`}
            ref={dropdownRef}
            onMouseEnter={() => window.innerWidth > 768 && setActiveDropdown('services')}
            onMouseLeave={() => window.innerWidth > 768 && setActiveDropdown(null)}
            style={{"--index": 3}}
          >
            <div 
              className="nav-link"
              onClick={toggleDropdown}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <span className="nav-link-icon">🛠️</span>
              Services
              <span className="dropdown-toggle-icon">▼</span>
              {ripples.map(ripple => (
                <span
                  key={ripple.id}
                  className="ripple"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                  }}
                />
              ))}
            </div>
            <div className="dropdown-menu">
              {services.map((service, index) => (
                <a
                  key={index}
                  href={service.href}
                  className="dropdown-item"
                  style={{"--index": index}}
                  onClick={handleMenuItemClick}
                >
                  <div className="dropdown-item-icon">{service.icon}</div>
                  <div className="dropdown-item-content">
                    <div className="dropdown-item-label">{service.label}</div>
                    <div className="dropdown-item-description">{service.description}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          <a 
            href="/client" 
            className="nav-link" 
            style={{"--index": 4}}
            onClick={handleMenuItemClick}
          >
            <span className="nav-link-icon">👥</span>
            Clients
          </a>
          
          <a 
            href="/contact" 
            className="nav-link" 
            style={{"--index": 5}}
            onClick={handleMenuItemClick}
          >
            <span className="nav-link-icon">📞</span>
            Contact
          </a>

          {/* <div className="mobile-swipe-indicator">
            Swipe left to close ←
          </div> */}
        </div>
      </nav>
    </>
  );
};

export default Navigation;