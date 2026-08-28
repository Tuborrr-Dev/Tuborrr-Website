import React, { useRef } from 'react';
import { blogPosts } from '../../data/portfolioConfig';
import { sounds } from '../Sound/soundEffects';
import { ChevronLeft, ChevronRight, ArrowUpRight, ExternalLink } from 'lucide-react';

export const LatestArticles: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    sounds.playClick();
    if (!sliderRef.current) return;
    const amount = direction === 'left' ? -340 : 340;
    sliderRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const handleArticleClick = (post: typeof blogPosts[0]) => {
    sounds.playClick();
    if (post.link) {
      window.open(post.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 text-neutral-800 dark:text-neutral-200 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <span>Engineering Insights & Articles</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Technical writing & deep dives
          </h2>
        </div>

        {/* Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll articles left"
            className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll articles right"
            className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Articles Slider Track */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {blogPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => handleArticleClick(post)}
            data-cursor={post.link ? "Open Medium" : "Read Article"}
            data-cursor-icon="arrow"
            className="w-[300px] sm:w-[340px] shrink-0 snap-start rounded-3xl bg-white dark:bg-[#121317] border border-neutral-200 dark:border-neutral-800/80 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer overflow-hidden flex flex-col justify-between group"
          >
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121317] via-transparent to-transparent" />
              {post.link && (
                <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-mono flex items-center gap-1 border border-white/10">
                  <span>Medium</span>
                  <ExternalLink className="w-3 h-3 text-google-green" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-google-blue transition-colors leading-snug mb-2">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              {/* Tags & Action */}
              <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-google-blue group-hover:translate-x-0.5 transition-transform">
                  {post.link ? "Read on Medium" : "Read"} <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
