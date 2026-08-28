import React, { useState, useEffect, useRef } from 'react';
import { developerProfile } from '../../data/portfolioConfig';
import { sounds } from '../Sound/soundEffects';
import { 
  Terminal, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  Menu, 
  X,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

import { ProfileModal } from './ProfileModal';

interface HeaderProps {
  onOpenTerminal?: () => void;
}

interface NavItem {
  name: string;
  desc?: string;
  href: string;
  external?: boolean;
  onClick?: () => void;
}

interface NavSection {
  id: string;
  label: string;
  editorialTitle: React.ReactNode;
  items: NavItem[];
}

// Acumen Digital style vertical sliding / rolling text reveal component
const RollingNavText: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => {
  return (
    <span className={`relative inline-flex flex-col overflow-hidden h-[18px] leading-[18px] ${className}`}>
      <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full select-none">
        {text}
      </span>
      <span className="absolute top-0 left-0 inline-block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0 text-google-blue font-medium select-none">
        {text}
      </span>
    </span>
  );
};

export const Header: React.FC<HeaderProps> = ({ onOpenTerminal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  
  const lastScrollY = useRef(0);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if user previously explicitly chose dark mode
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Autohide when scrolling DOWN (going down in page), Appear when scrolling UP (going up in page)
      if (currentScrollY > 60) {
        if (currentScrollY > lastScrollY.current + 4) {
          // Scrolling DOWN -> autohide header
          setIsHeaderHidden(true);
          setActiveDropdown(null);
        } else if (currentScrollY < lastScrollY.current - 4) {
          // Scrolling UP -> reveal header
          setIsHeaderHidden(false);
        }
      } else {
        // At top of page -> always show header
        setIsHeaderHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    sounds.playClick();
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    }
  };

  const toggleSound = () => {
    const state = sounds.toggleSound();
    setSoundActive(state);
  };

  const handleMouseEnterNav = (id: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(id);
    sounds.playHover();
  };

  const handleMouseLeaveNav = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const navSections: NavSection[] = [
    {
      id: 'projects',
      label: 'Projects',
      editorialTitle: (
        <>
          Everything built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue via-google-red to-google-yellow">production scale</span> and real-time execution
        </>
      ),
      items: [
        { 
          name: 'Pitchline AI Annotator', 
          desc: 'Real-time win probability & Groq LLM streaming', 
          href: 'https://pitchline-five.vercel.app/',
          external: true
        },
        { 
          name: 'Weather & Geocoding API', 
          desc: 'FastAPI with in-memory Redis caching layers', 
          href: 'https://tuborrr-dev.github.io/Weather-API-Wrapper/',
          external: true
        },
        { 
          name: 'LSA Booking Platform', 
          desc: 'Flask REST API, HMAC Webhooks & Paystack billing', 
          href: 'https://github.com/Tuborrr-Dev/HabotConnect-LSA',
          external: true
        },
      ]
    },
    {
      id: 'stack',
      label: 'Architecture',
      editorialTitle: (
        <>
          Robust backend foundations engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-green via-google-blue to-google-yellow">high-concurrency</span> systems
        </>
      ),
      items: [
        { 
          name: 'Python Microservices (FastAPI, Django, Flask)', 
          desc: 'Async REST APIs, strict Pydantic validation & MVC architecture', 
          href: '#features' 
        },
        { 
          name: 'Node.js & Express Service Layers', 
          desc: 'Modular middleware, asynchronous event loops & JWT security', 
          href: '#features' 
        },
        { 
          name: 'Databases & In-Memory Caching (PostgreSQL, Redis)', 
          desc: 'Async SQLAlchemy ORM, compound indexing & pub/sub messaging', 
          href: '#features' 
        },
        { 
          name: 'Selenium & Web Scraping ETL', 
          desc: '99%+ reliability automated browser pipelines & Pandas data parsing', 
          href: '#features' 
        },
      ]
    },
    {
      id: 'testimonials',
      label: 'Testimonials',
      editorialTitle: (
        <>
          Direct peer trust and <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-yellow via-google-red to-google-blue">real-world</span> collaboration
        </>
      ),
      items: [
        { name: 'Tomiwa Odufowakan', desc: 'Backend Developer at Cavista Technologies', href: '#testimonials' },
        { name: 'Chidera Pearl', desc: 'SDE 2 at Amazon • CTO at Orbytl', href: '#testimonials' },
        { name: 'Kejawa Temiloluwa', desc: 'IT Specialist at Walure', href: '#testimonials' },
      ]
    },
    {
      id: 'writing',
      label: 'Articles',
      editorialTitle: (
        <>
          Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue via-google-red to-google-green">stay up-to-date</span> and dive deep
        </>
      ),
      items: [
        { name: 'Medium Featured Article', desc: 'Technical writings on system design & backend architectures', href: 'https://medium.com/@israeltubo/e047b9393f67?sharedUserId=israeltubo', external: true },
        { name: 'Real-Time SSE Match Annotations', desc: 'FastAPI + Groq Llama 3.3 live streaming terminal', href: '#blog' },
      ]
    }
  ];

  const currentSection = navSections.find(s => s.id === activeDropdown);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
        isHeaderHidden ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      } ${
        isScrolled || activeDropdown
          ? 'bg-white/95 dark:bg-[#0b0c10]/95 backdrop-blur-2xl border-b border-neutral-200/80 dark:border-neutral-800 shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
      onMouseLeave={handleMouseLeaveNav}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Real Avatar Image */}
        <button
          type="button"
          onClick={() => {
            sounds.playClick();
            const rect = avatarRef.current?.getBoundingClientRect();
            setTriggerRect(rect || null);
            setProfileModalOpen(true);
          }}
          className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
          aria-label="View profile and contact information"
        >
          {/* User's Real Photo Avatar */}
          <div 
            ref={avatarRef}
            className="relative w-9 h-9 rounded-full ring-2 ring-neutral-200 dark:ring-neutral-700/80 overflow-hidden shadow-sm group-hover:ring-google-blue transition-all flex items-center justify-center bg-neutral-900 shrink-0"
          >
            <img
              src="/avatar.jpg"
              alt="Israel Adetubo"
              className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          
          <div className="flex flex-col">
            <span className="font-semibold text-[15px] tracking-tight text-neutral-900 dark:text-white flex items-center gap-1.5 leading-tight group-hover:text-google-blue transition-colors">
              {developerProfile.name}
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-google-green animate-pulse" />
            </span>
            <span className="text-[12px] font-normal text-neutral-500 dark:text-neutral-400 tracking-normal mt-0.5">
              {developerProfile.role}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links with Acumen Digital Slide-Up Rolling Effect */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navSections.map((link) => {
            const isActive = activeDropdown === link.id;
            return (
              <div
                key={link.id}
                onMouseEnter={() => handleMouseEnterNav(link.id)}
              >
                <button
                  className={`group flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' 
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  <RollingNavText text={link.label} />
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? 'rotate-180 text-google-blue' : 'opacity-70'}`} />
                </button>
              </div>
            );
          })}
        </nav>

        {/* Action Controls & Utilities */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound Effects"
            className="p-2.5 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-all border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
            title={soundActive ? "Mute audio synthesis" : "Enable tactile sound synthesis"}
          >
            {soundActive ? (
              <Volume2 className="w-4 h-4 text-google-blue animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Dark / Light Mode Switch */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-all border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
          >
            {isDark ? <Sun className="w-4 h-4 text-google-yellow" /> : <Moon className="w-4 h-4 text-neutral-800" />}
          </button>

          {/* Quick Terminal Launcher */}
          {onOpenTerminal && (
            <button
              onClick={() => {
                sounds.playClick();
                onOpenTerminal();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all border border-neutral-200 dark:border-neutral-700/80"
            >
              <Terminal className="w-3.5 h-3.5 text-google-green" />
              <span>CLI</span>
            </button>
          )}

          {/* Contact Me Pill Button */}
          <a
            href={developerProfile.socials.email}
            onClick={() => sounds.playClick()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white bg-google-blue hover:bg-google-hoverBlue shadow-lg shadow-google-blue/25 hover:shadow-google-blue/40 transition-all transform hover:-translate-y-0.5"
          >
            <span>Get in Touch</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleSound}
            className="p-2 text-neutral-400"
            aria-label="Sound Toggle"
          >
            {soundActive ? <Volume2 className="w-4 h-4 text-google-blue" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 text-neutral-400"
            aria-label="Theme Toggle"
          >
            {isDark ? <Sun className="w-4 h-4 text-google-yellow" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg text-neutral-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Full-Width Panoramic Mega-Menu Shelf with Soft Fade-In Top-to-Bottom */}
      {currentSection && (
        <div 
          className="hidden lg:block w-full bg-white/98 dark:bg-[#0b0c10]/98 backdrop-blur-2xl border-t border-b border-neutral-200/80 dark:border-neutral-800 shadow-2xl transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-3"
          onMouseEnter={() => {
            if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
          }}
          onMouseLeave={handleMouseLeaveNav}
        >
          <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-12 gap-12 items-start">
            {/* Left Editorial Column with Smooth Gentle Fade In */}
            <div className="col-span-5 pr-6 transition-all duration-300 delay-75 transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-top-2">
              <h3 className="text-2xl sm:text-[28px] font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.25]">
                {currentSection.editorialTitle}
              </h3>
            </div>

            {/* Vertical Divider */}
            <div className="col-span-1 flex justify-center h-full min-h-[140px] opacity-70">
              <div className="w-[1px] h-full bg-neutral-200 dark:border-neutral-800" />
            </div>

            {/* Right Sleek Typography Links Column with Staggered Cascading Top-to-Bottom Soft Motion */}
            <div className="col-span-6 space-y-4">
              {currentSection.items.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  onClick={() => {
                    sounds.playClick();
                    if (item.onClick) item.onClick();
                    setActiveDropdown(null);
                  }}
                  style={{
                    animationDelay: `${idx * 45}ms`,
                  }}
                  className="group block py-1 text-neutral-800 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white transition-all transform hover:translate-x-1 duration-200 animate-in fade-in slide-in-from-top-1 fill-mode-both"
                >
                  <div className="text-base font-semibold group-hover:text-google-blue dark:group-hover:text-google-blue transition-colors flex items-center gap-1.5">
                    <span>{item.name}</span>
                    {item.external && <ExternalLink className="w-3.5 h-3.5 opacity-60 text-neutral-400" />}
                  </div>
                  {item.desc && (
                    <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-normal mt-0.5">
                      {item.desc}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121317]/95 backdrop-blur-2xl border-b border-neutral-800 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top duration-200">
          <div className="space-y-2">
            <a
              href="https://pitchline-five.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-neutral-200 hover:text-google-blue flex items-center justify-between"
            >
              <span>Pitchline AI Annotator</span>
              <ExternalLink className="w-4 h-4 text-google-blue" />
            </a>
            <a
              href="https://tuborrr-dev.github.io/Weather-API-Wrapper/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-neutral-200 hover:text-google-blue flex items-center justify-between"
            >
              <span>Weather & Geocoding API</span>
              <ExternalLink className="w-4 h-4 text-google-blue" />
            </a>
            <a
              href="https://github.com/Tuborrr-Dev/HabotConnect-LSA"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-neutral-200 hover:text-google-blue flex items-center justify-between"
            >
              <span>LSA Booking Platform</span>
              <ExternalLink className="w-4 h-4 text-google-blue" />
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-neutral-200 hover:text-google-blue"
            >
              Backend Architecture & Stack
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-neutral-200 hover:text-google-blue"
            >
              Peer Testimonials
            </a>
            <a
              href="#terminal"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenTerminal) onOpenTerminal();
              }}
              className="block py-2 text-base font-medium text-neutral-200 hover:text-google-blue"
            >
              Interactive CLI Terminal
            </a>
            <a
              href="https://medium.com/@israeltubo/e047b9393f67?sharedUserId=israeltubo"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-neutral-200 hover:text-google-blue flex items-center justify-between"
            >
              <span>Medium Publication</span>
              <ExternalLink className="w-4 h-4 text-google-green" />
            </a>
          </div>

          <div className="pt-4 border-t border-neutral-800 flex flex-col gap-3">
            <a
              href={developerProfile.socials.email}
              className="w-full py-3 rounded-full text-center text-sm font-medium text-white bg-google-blue"
            >
              Contact Israel Adetubo
            </a>
          </div>
        </div>
      )}

      {/* Profile & Contact Zoom Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        triggerRect={triggerRect}
        onClose={() => setProfileModalOpen(false)}
      />
    </header>
  );
};
