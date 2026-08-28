import React, { useState, useRef } from 'react';
import { developerProfile } from '../../data/portfolioConfig';
import { PanoramicMorphingCanvas } from './PanoramicMorphingCanvas';
import { sounds } from '../Sound/soundEffects';

export const DualSolutions: React.FC = () => {
  const [activeZone, setActiveZone] = useState<'left' | 'right' | null>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  return (
    <section id="solutions" className="relative w-full min-h-[640px] lg:min-h-[700px] flex items-center justify-center overflow-hidden border-y border-neutral-100 dark:border-neutral-900 bg-white dark:bg-[#0b0c10] select-none py-20">
      {/* 1. Full-Width Interactive Particle Morphing Canvas with Exact DOM Centering */}
      <PanoramicMorphingCanvas 
        activeZone={activeZone} 
        leftCenterRef={leftContentRef}
        rightCenterRef={rightContentRef}
      />

      {/* 2. Unified Two-Column Content Over Canvas */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 items-center">
        
        {/* Left Zone: For Startups -> Morphs into Antigravity Structural Code Curly Brackets { } */}
        <div
          ref={leftContentRef}
          onMouseEnter={() => {
            setActiveZone('left');
            sounds.playHover();
          }}
          onMouseLeave={() => setActiveZone(null)}
          className="flex flex-col items-center justify-center text-center p-6 sm:p-10 cursor-pointer"
        >
          {/* Badge */}
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-medium bg-neutral-100/90 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 text-neutral-700 dark:text-neutral-300 mb-6 shadow-sm">
            Available for fast engagement
          </span>

          {/* Titles */}
          <h3 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-neutral-900 dark:text-white mb-2 leading-tight whitespace-nowrap">
            For Startups
          </h3>
          <p className="text-2xl sm:text-4xl lg:text-[40px] font-normal text-neutral-700 dark:text-neutral-200 mb-8 tracking-tight whitespace-nowrap">
            Achieve new heights
          </p>

          {/* CTA Button */}
          <a
            href={developerProfile.socials.email}
            onClick={() => sounds.playClick()}
            className="px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:bg-google-blue dark:hover:bg-google-blue dark:hover:text-white shadow-xl hover:shadow-google-blue/30 transition-all transform hover:-translate-y-0.5"
          >
            Build With Me
          </a>
        </div>

        {/* Right Zone: For Companies -> Morphs into Antigravity 6-Circle Flower Ring */}
        <div
          ref={rightContentRef}
          onMouseEnter={() => {
            setActiveZone('right');
            sounds.playHover();
          }}
          onMouseLeave={() => setActiveZone(null)}
          className="flex flex-col items-center justify-center text-center p-6 sm:p-10 cursor-pointer"
        >
          {/* Badge */}
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-medium bg-neutral-100/90 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 text-neutral-700 dark:text-neutral-300 mb-6 shadow-sm">
            Open to Full-Time Roles
          </span>

          {/* Titles */}
          <h3 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-neutral-900 dark:text-white mb-2 leading-tight whitespace-nowrap">
            For Companies
          </h3>
          <p className="text-2xl sm:text-4xl lg:text-[40px] font-normal text-neutral-700 dark:text-neutral-200 mb-8 tracking-tight whitespace-nowrap">
            Scale with new might
          </p>

          {/* CTA Button */}
          <a
            href={developerProfile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="px-8 py-3.5 rounded-full text-sm font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800/90 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Review My CV
          </a>
        </div>

      </div>
    </section>
  );
};
