import React from 'react';
import { ProjectItem } from '../../types/portfolio';
import { sounds } from '../Sound/soundEffects';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <div
      onClick={() => {
        sounds.playClick();
        onSelect(project);
      }}
      data-cursor="Inspect Architecture"
      data-cursor-icon="arrow"
      className="group relative flex flex-col h-[460px] rounded-3xl bg-white dark:bg-[#121317] border border-neutral-200 dark:border-neutral-800/80 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden select-none"
    >
      {/* Top Image Preview with Zoom on Hover */}
      <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121317] via-black/20 to-transparent" />

        {/* Top Right Action Circle */}
        <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md flex items-center justify-center text-neutral-900 dark:text-white group-hover:bg-google-blue group-hover:text-white transition-all transform group-hover:rotate-45">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>

          <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2 group-hover:text-google-blue transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Tags */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 text-[11px] font-medium"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800/80 text-neutral-500 text-[11px] font-medium">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
