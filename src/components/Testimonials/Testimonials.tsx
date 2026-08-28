import React, { useState, useEffect, useRef } from 'react';
import { sounds } from '../Sound/soundEffects';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface TestimonialItem {
  id: string;
  name: string;
  roleLine: string;
  roleTag: string;
  image: string;
  isCustomAvatar?: boolean;
  initials?: string;
  quote: string;
  collaboration: string;
  tags: string[];
}

export const Testimonials: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragVelocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);

  const baseTestimonials: TestimonialItem[] = [
    {
      id: 'tomiwa',
      name: 'Tomiwa Odufowakan',
      roleLine: 'Backend Developer at Cavista Technologies',
      roleTag: 'Pitchline Co-Collaborator',
      image: '/testimonials/tomiwa.jpg',
      quote: "Collaborating with Israel on Pitchline was exceptional. He architected the real-time SSE streaming pipeline and Groq LLM integration with sub-second latency, delivering clean, reliable Python under high pressure.",
      collaboration: "FastAPI + Redis SSE & Groq LLM Hackathon Engine",
      tags: ["FastAPI", "Groq Llama 3.3", "SSE Streaming", "Redis"]
    },
    {
      id: 'chidera',
      name: 'Chidera Pearl',
      roleLine: 'SDE 2 at Amazon • CTO at Orbytl',
      roleTag: 'Havyn Technical Reviewer',
      image: '/testimonials/chidera.jpg',
      quote: "Israel’s attention to detail during the architectural testing of Havyn was stellar. He caught subtle edge cases across complex flows, delivering thoughtful solutions that measurably elevated platform reliability.",
      collaboration: "Havyn Application Testing & UX Architecture",
      tags: ["Quality Assurance", "Design Architecture", "Edge-Case Testing"]
    },
    {
      id: 'temiloluwa',
      name: 'Kejawa Temiloluwa',
      roleLine: 'IT Specialist at Walure',
      roleTag: 'Engineering Peer & Collaborator',
      image: '',
      isCustomAvatar: true,
      initials: 'KT',
      quote: "Israel possesses a relentless drive for engineering excellence. From optimizing database queries and Redis caching layers to building AI backend systems, his technical rigor and problem-solving mindset stand out.",
      collaboration: "Systems Engineering & Backend Architecture",
      tags: ["Backend Systems", "Problem Solving", "Database Architecture"]
    }
  ];

  // Repeat items 4 times for a truly seamless infinite flowing ribbon
  const repeatedTestimonials: (TestimonialItem & { uniqueKey: string })[] = [
    ...baseTestimonials.map(item => ({ ...item, uniqueKey: `${item.id}-1` })),
    ...baseTestimonials.map(item => ({ ...item, uniqueKey: `${item.id}-2` })),
    ...baseTestimonials.map(item => ({ ...item, uniqueKey: `${item.id}-3` })),
    ...baseTestimonials.map(item => ({ ...item, uniqueKey: `${item.id}-4` })),
  ];

  // Infinite Marquee Motion & Drag Engine
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animId: number;
    const cardWidthEstimate = 520; // card width + gap
    const singleSetWidth = baseTestimonials.length * cardWidthEstimate;
    const autoSpeed = 0.65;

    const renderLoop = () => {
      if (!isDraggingRef.current) {
        if (Math.abs(dragVelocityRef.current) > 0.05) {
          offsetRef.current += dragVelocityRef.current;
          dragVelocityRef.current *= 0.94; // friction
        } else if (!isPaused) {
          offsetRef.current += autoSpeed;
        }
      }

      // Seamless infinite wrap around single set
      if (offsetRef.current >= singleSetWidth) {
        offsetRef.current -= singleSetWidth;
      } else if (offsetRef.current < 0) {
        offsetRef.current += singleSetWidth;
      }

      if (track) {
        track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    // Pointer Drag Handlers
    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      lastXRef.current = e.clientX;
      lastTimeRef.current = performance.now();
      dragVelocityRef.current = 0;
      track.style.cursor = 'grabbing';
      sounds.playClick();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const now = performance.now();
      const dt = Math.max(1, now - lastTimeRef.current);
      const deltaX = e.clientX - lastXRef.current;

      offsetRef.current -= deltaX;
      dragVelocityRef.current = -deltaX / (dt / 16);

      lastXRef.current = e.clientX;
      lastTimeRef.current = now;
    };

    const onPointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        track.style.cursor = 'grab';
      }
    };

    const parent = track.parentElement;
    if (parent) {
      parent.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
    }

    return () => {
      cancelAnimationFrame(animId);
      if (parent) {
        parent.removeEventListener('pointerdown', onPointerDown);
      }
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [isPaused]);

  const slideManual = (direction: 'next' | 'prev') => {
    sounds.playClick();
    if (direction === 'next') {
      dragVelocityRef.current = 9;
    } else {
      dragVelocityRef.current = -9;
    }
  };

  return (
    <section id="testimonials" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0b0c10] border-t border-neutral-100 dark:border-neutral-900 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto mb-14">
        {/* Antigravity Style Header Layout (Left: Big Heading, Right: Subtitle & Controls) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 text-neutral-800 dark:text-neutral-200 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
              <span>Peer Endorsements</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.12]">
              Built for collaboration <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue via-google-red to-google-yellow">
                in the agent-first era
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:max-w-md">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
              Engineered for high trust, rapid iteration, and direct peer impact—flowing continuously across real-world collaborations.
            </p>

            {/* Quick Flow Control Arrows */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => slideManual('prev')}
                aria-label="Slide Left"
                className="p-3 rounded-full bg-neutral-100 dark:bg-[#16171d] border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:border-google-blue transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => slideManual('next')}
                aria-label="Slide Right"
                className="p-3 rounded-full bg-neutral-100 dark:bg-[#16171d] border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:border-google-blue transition-all active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Infinite Flowing Testimonial Ribbon */}
      <div 
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing touch-none py-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Subtle Fade Edge Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white dark:from-[#0b0c10] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white dark:from-[#0b0c10] to-transparent z-10 pointer-events-none" />

        {/* Continuous Flowing Track */}
        <div
          ref={trackRef}
          className="flex items-stretch gap-6 will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          {repeatedTestimonials.map((item) => (
            <div
              key={item.uniqueKey}
              className="w-[300px] sm:w-[460px] md:w-[500px] shrink-0 bg-neutral-50/90 dark:bg-[#121317]/90 rounded-3xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800/80 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:border-google-blue/50 dark:hover:border-google-blue/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Header with Circular Matte Avatar */}
                <div className="flex items-start justify-between gap-3 sm:gap-4 mb-6">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 pr-1">
                    {/* Circular Matte Headshot */}
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full ring-2 sm:ring-3 ring-white dark:ring-neutral-800 shadow-md overflow-hidden bg-neutral-900 shrink-0">
                      {item.isCustomAvatar ? (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-950 flex items-center justify-center font-mono text-sm sm:text-base font-bold text-white">
                          {item.initials}
                        </div>
                      ) : (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-neutral-900/10 pointer-events-none" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white truncate leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 font-medium truncate mt-0.5 leading-snug" title={item.roleLine}>
                        {item.roleLine}
                      </p>
                    </div>
                  </div>

                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-300 dark:text-neutral-700 shrink-0 opacity-40 group-hover:text-google-blue group-hover:opacity-80 transition-all" />
                </div>

                {/* Quote Content */}
                <blockquote className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal mb-6 line-clamp-5">
                  "{item.quote}"
                </blockquote>
              </div>

              {/* Tags & Meta Footer */}
              <div className="pt-4 border-t border-neutral-200/70 dark:border-neutral-800/70 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  {item.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-google-yellow">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
