import React from 'react';
import { developerProfile } from '../../data/portfolioConfig';
import { sounds } from '../Sound/soundEffects';
import { Mail, ArrowUp } from 'lucide-react';

export const FooterLinks: React.FC = () => {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800/80 bg-white/50 dark:bg-[#0b0c10]/80 backdrop-blur-lg pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-200 dark:border-neutral-800/80">
          {/* Left Brand Column */}
          <div className="md:col-span-5 space-y-4 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full ring-2 ring-neutral-200 dark:ring-neutral-700/80 overflow-hidden shadow-sm flex items-center justify-center bg-neutral-900">
                <img
                  src="/avatar.jpg"
                  alt="Israel Adetubo"
                  className="w-full h-full object-cover object-top scale-105"
                />
              </div>
              <span className="text-xl font-semibold text-neutral-900 dark:text-white tracking-tight">
                {developerProfile.name}
              </span>
            </div>

            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              {developerProfile.tagline}
            </p>

            {/* Social Links with Crisp Brand SVGs */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={developerProfile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-google-blue hover:text-white flex items-center justify-center text-neutral-600 dark:text-neutral-400 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a
                href={developerProfile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-google-blue hover:text-white flex items-center justify-center text-neutral-600 dark:text-neutral-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href={developerProfile.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-google-blue hover:text-white flex items-center justify-center text-neutral-600 dark:text-neutral-400 transition-colors"
                aria-label="X / Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={developerProfile.socials.email}
                onClick={() => sounds.playClick()}
                className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-google-blue hover:text-white flex items-center justify-center text-neutral-600 dark:text-neutral-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
                Architecture
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#features" className="text-neutral-600 dark:text-neutral-400 hover:text-google-blue transition-colors">FastAPI Microservices</a></li>
                <li><a href="#features" className="text-neutral-600 dark:text-neutral-400 hover:text-google-blue transition-colors">Interactive CLI</a></li>
                <li><a href="#features" className="text-neutral-600 dark:text-neutral-400 hover:text-google-blue transition-colors">PostgreSQL & Redis</a></li>
                <li><a href="#features" className="text-neutral-600 dark:text-neutral-400 hover:text-google-blue transition-colors">Selenium & ETL</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
                Selected Work
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#projects" className="text-neutral-600 dark:text-neutral-400 hover:text-google-blue transition-colors">Pitchline AI</a></li>
                <li><a href="#projects" className="text-neutral-600 dark:text-neutral-400 hover:text-google-blue transition-colors">LSA Booking</a></li>
                <li><a href="#projects" className="text-neutral-600 dark:text-neutral-400 hover:text-google-blue transition-colors">Weather API</a></li>
                <li><a href="#projects" className="text-neutral-600 dark:text-neutral-400 hover:text-google-blue transition-colors">Google Audit</a></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1 pt-4 sm:pt-0 border-t border-neutral-200/60 dark:border-neutral-800/60 sm:border-t-0">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
                Contact & Status
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-xs text-google-green font-medium whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-google-green animate-pulse shrink-0" />
                  <span className="whitespace-nowrap">{developerProfile.status}</span>
                </div>
                <p className="text-xs text-neutral-500">{developerProfile.location}</p>
                <a
                  href={developerProfile.socials.email}
                  className="inline-block text-xs text-google-blue hover:underline font-medium"
                >
                  {developerProfile.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-500 text-center sm:text-left">
          <div className="max-w-md sm:max-w-none">
            © {new Date().getFullYear()} {developerProfile.name}. Design Inspired by Google Antigravity Page.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span>FastAPI • Python • Redis • PostgreSQL</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
