import React, { useState, useRef } from 'react';
import { projectItems } from '../../data/portfolioConfig';
import { ProjectItem } from '../../types/portfolio';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { sounds } from '../Sound/soundEffects';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ProjectSlider: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'AI Agents', 'Fullstack', '3D & Graphics', 'Systems'];

  const filteredProjects = selectedCategory === 'All'
    ? projectItems
    : projectItems.filter(p => p.category === selectedCategory);

  const scroll = (direction: 'left' | 'right') => {
    sounds.playClick();
    if (!sliderRef.current) return;
    const scrollAmount = direction === 'left' ? -380 : 380;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 text-neutral-800 dark:text-neutral-200 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <span>Selected Use Cases</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Engineered for high impact
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex items-center flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-google-blue text-white shadow-md shadow-google-blue/20'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Slider Carousel Wrapper */}
      <div className="relative group">
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="w-[82vw] xs:w-[320px] sm:w-[380px] max-w-[380px] shrink-0 snap-start"
            >
              <ProjectCard
                project={project}
                onSelect={(p) => setSelectedProject(p)}
              />
            </div>
          ))}
        </div>

        {/* Carousel Navigation Arrow Controls */}
        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 transition-colors border border-neutral-200 dark:border-neutral-700 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 transition-colors border border-neutral-200 dark:border-neutral-700 shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Detailed Inspection Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
