import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ProjectItem } from '../../types/portfolio';
import { sounds } from '../Sound/soundEffects';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sounds.playClick();
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
      onClick={() => {
        sounds.playClick();
        onClose();
      }}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] max-h-[90dvh] bg-white dark:bg-[#121317] rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Statically fixed at top right of modal for easy closing on all screens */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md shadow-lg border border-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Scrollable Container with Smooth Touch Scrolling & Hidden Scrollbar */}
        <div className="overflow-y-auto flex-1 overscroll-contain scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Modal Hero Image */}
          <div className="relative h-48 sm:h-64 md:h-72 w-full overflow-hidden bg-neutral-900 shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121317] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-google-blue/90 text-white text-xs font-semibold tracking-wide uppercase backdrop-blur-sm">
                {project.category}
              </span>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-2 break-words leading-snug">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-medium break-words leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Performance Metrics Badges - Fully Responsive with word wrapping */}
            {project.metrics && (
              <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="text-center min-w-0 px-0.5 sm:px-1 flex flex-col justify-center">
                    <div className="text-xs sm:text-base md:text-xl font-bold text-google-blue leading-tight break-words [overflow-wrap:anywhere]">
                      {m.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-wider mt-1 truncate sm:overflow-visible">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Detailed Overview */}
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2">
                Architectural Overview
              </h4>
              <p className="text-xs sm:text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed break-words">
                {project.longDescription}
              </p>
            </div>

            {/* Key Engineering Highlights */}
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-3">
                Key Highlights & Results
              </h4>
              <div className="space-y-2.5">
                {project.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-google-green shrink-0 mt-0.5" />
                    <span className="break-words leading-relaxed">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div>
              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 sm:px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-[11px] sm:text-xs font-medium border border-neutral-200 dark:border-neutral-700 break-words"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full text-sm font-semibold text-white bg-google-blue hover:bg-google-hoverBlue transition-colors shadow-lg shadow-google-blue/20 w-full sm:w-auto"
                >
                  <span>Live Demonstration</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full text-sm font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors border border-neutral-200 dark:border-neutral-700 w-full sm:w-auto"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
