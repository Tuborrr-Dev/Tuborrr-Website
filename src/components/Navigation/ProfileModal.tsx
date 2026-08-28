import React, { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { developerProfile } from '../../data/portfolioConfig';
import { sounds } from '../Sound/soundEffects';
import { 
  X, 
  Mail, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink 
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRect?: DOMRect | null;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, triggerRect }) => {
  const [copied, setCopied] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setContentVisible(false);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Smoothly reveal details once the circle expansion is underway (180ms)
      const contentTimer = setTimeout(() => {
        setContentVisible(true);
      }, 180);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(contentTimer);
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    sounds.playClick();
    setContentVisible(false);
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 310);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    navigator.clipboard.writeText(developerProfile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const originStyles = useMemo(() => {
    if (typeof window === 'undefined') return {};

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const modalSize = windowWidth >= 640 ? 420 : 360;
    const modalCenterX = windowWidth / 2;
    const modalCenterY = windowHeight / 2;

    const triggerX = triggerRect 
      ? triggerRect.left + triggerRect.width / 2 
      : 40;
    const triggerY = triggerRect 
      ? triggerRect.top + triggerRect.height / 2 
      : 40;

    const deltaX = triggerX - modalCenterX;
    const deltaY = triggerY - modalCenterY;
    const startScale = triggerRect ? Math.max(0.06, triggerRect.width / modalSize) : 0.08;

    return {
      '--origin-x': `${deltaX}px`,
      '--origin-y': `${deltaY}px`,
      '--start-scale': `${startScale}`,
      animation: isClosing
        ? 'storyCollapse 320ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
        : 'storyExpand 380ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
    } as React.CSSProperties;
  }, [triggerRect, isClosing]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
      style={{
        animation: isClosing
          ? 'storyBackdropOut 320ms ease-in forwards'
          : 'storyBackdropIn 350ms ease-out forwards'
      }}
      onClick={handleClose}
    >
      {/* Circular Instagram Story Expand Window */}
      <div
        style={originStyles}
        className="relative w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] rounded-full bg-white dark:bg-[#121317]/95 backdrop-blur-2xl border border-neutral-200/90 dark:border-neutral-700/80 shadow-[0_25px_70px_rgba(0,0,0,0.5)] p-6 sm:p-8 flex flex-col items-center justify-center text-center select-none overflow-hidden will-change-transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-google-blue/10 via-transparent to-google-green/5 pointer-events-none rounded-full" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`absolute top-6 right-6 sm:top-8 sm:right-8 z-20 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800/90 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white shadow-md flex items-center justify-center cursor-pointer transition-opacity duration-200 ${
            contentVisible ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Zoomed Avatar Picture Circle */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-neutral-200 dark:ring-neutral-700/80 shadow-2xl mb-3 shrink-0 group bg-neutral-900">
          <img
            src="/avatar.jpg"
            alt={developerProfile.name}
            className="w-full h-full object-cover object-top scale-105 group-hover:scale-115 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Delayed Fade-in Details Container (No Squished Text During Animation) */}
        <div
          className={`flex flex-col items-center transition-all duration-200 ${
            contentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          {/* Name & Availability Pulse */}
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-1.5 leading-tight">
            <span>{developerProfile.name}</span>
            <span className="inline-block w-2 h-2 rounded-full bg-google-green animate-pulse" title="Available for roles" />
          </h3>

          {/* Role Tagline */}
          <p className="text-xs sm:text-sm font-medium text-google-blue mt-0.5 mb-3.5">
            {developerProfile.role}
          </p>

          {/* Circular Contact Icons Row */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 mb-3.5">
            {/* Email Icon */}
            <a
              href={`mailto:${developerProfile.email}`}
              onClick={() => sounds.playClick()}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-100 dark:bg-neutral-800/90 hover:bg-google-blue hover:text-white dark:hover:bg-google-blue text-neutral-700 dark:text-neutral-300 flex items-center justify-center transition-all shadow-sm hover:scale-110"
              title={`Email: ${developerProfile.email}`}
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* LinkedIn Icon */}
            <a
              href={developerProfile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-100 dark:bg-neutral-800/90 hover:bg-[#0A66C2] hover:text-white dark:hover:bg-[#0A66C2] text-neutral-700 dark:text-neutral-300 flex items-center justify-center transition-all shadow-sm hover:scale-110"
              title="LinkedIn Profile"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>

            {/* GitHub Icon */}
            <a
              href={developerProfile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-100 dark:bg-neutral-800/90 hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 flex items-center justify-center transition-all shadow-sm hover:scale-110"
              title="GitHub Profile"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>

            {/* X / Twitter Icon */}
            <a
              href={developerProfile.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-100 dark:bg-neutral-800/90 hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 flex items-center justify-center transition-all shadow-sm hover:scale-110"
              title="X (Twitter) Profile"
              aria-label="X (Twitter)"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* CV / Resume Icon */}
            <a
              href={developerProfile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-100 dark:bg-neutral-800/90 hover:bg-google-green hover:text-white dark:hover:bg-google-green text-neutral-700 dark:text-neutral-300 flex items-center justify-center transition-all shadow-sm hover:scale-110"
              title="Review CV"
              aria-label="Review CV"
            >
              <FileText className="w-4 h-4" />
            </a>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEmail}
              className="px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 transition-colors border border-neutral-200 dark:border-neutral-700 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-google-green" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-neutral-500" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <a
              href={developerProfile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="px-3.5 py-1.5 rounded-full bg-google-blue hover:bg-google-hoverBlue text-[11px] font-semibold text-white flex items-center gap-1.5 transition-colors shadow-sm shadow-google-blue/20"
            >
              <span>Review CV</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
