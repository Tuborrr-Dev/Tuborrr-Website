import React from 'react';
import { developerProfile } from '../../data/portfolioConfig';
import { TypedHeader } from './TypedHeader';
import { HeroParticles } from './HeroParticles';
import { sounds } from '../Sound/soundEffects';
import { ArrowRight, Terminal } from 'lucide-react';

interface HeroSectionProps {
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTerminal }) => {
  return (
    <section className="relative min-h-[94vh] flex flex-col items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 3D WebGL Particle Torus Simulation Background */}
      <HeroParticles />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Experience Liftoff Badge - Clean, No Sparkles Icon beside role, Keep online beep */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-neutral-100/90 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 backdrop-blur-md mb-8 shadow-sm animate-float">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-google-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-google-green"></span>
          </span>
          <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 tracking-wide">
            {developerProfile.role}
          </span>
        </div>

        {/* Spacious, Downward-Flowing Rock-Solid Stable Typewriter Headline (Zero Badge Overlap & Zero Layout Shift) */}
        <div className="w-full max-w-4xl min-h-[190px] sm:min-h-[220px] md:min-h-[250px] lg:min-h-[270px] flex flex-col items-center justify-start text-center mb-6 px-2">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[66px] font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.18] text-center">
            <TypedHeader
              prefix={developerProfile.heroTypewriterPrefix}
              strings={developerProfile.heroTypewriterTexts}
            />
          </h1>
        </div>

        {/* Bio Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          {developerProfile.tagline}
        </p>

        {/* Call to Action Group */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          {/* Primary CTA */}
          <a
            href="#projects"
            onClick={() => sounds.playClick()}
            data-cursor="Explore Work"
            data-cursor-icon="arrow"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-google-blue hover:bg-google-hoverBlue shadow-xl shadow-google-blue/30 hover:shadow-google-blue/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Terminal CLI Launcher */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenTerminal();
            }}
            data-cursor="Launch CLI"
            data-cursor-icon="code"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100/90 dark:bg-[#16171d]/90 hover:bg-neutral-200 dark:hover:bg-[#20222a] border border-neutral-300/80 dark:border-neutral-700/80 backdrop-blur-md transition-all transform hover:-translate-y-0.5"
          >
            <Terminal className="w-4 h-4 text-google-green" />
            <span className="text-sm">Launch CLI Terminal</span>
          </button>

          {/* GitHub Profile */}
          <a
            href={developerProfile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            data-cursor="GitHub Repo"
            data-cursor-icon="code"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40 transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
        </div>

        {/* Status Pill Indicator */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60 text-xs font-medium text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-google-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-google-green"></span>
          </span>
          <span className="whitespace-nowrap">{developerProfile.status}</span>
        </div>
      </div>
    </section>
  );
};
