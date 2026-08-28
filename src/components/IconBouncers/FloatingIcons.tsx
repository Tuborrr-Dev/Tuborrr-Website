import React, { useState, useEffect, useRef } from 'react';
import { developerProfile } from '../../data/portfolioConfig';
import { techLogoList, TechItem } from './TechLogos';
import { sounds } from '../Sound/soundEffects';

export const FloatingIcons: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [bouncedId, setBouncedId] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Repeat the logos 4 times to guarantee a truly seamless infinite ribbon
  const repeatedLogos: TechItem[] = [
    ...techLogoList.map(item => ({ ...item, id: `${item.id}-1` })),
    ...techLogoList.map(item => ({ ...item, id: `${item.id}-2` })),
    ...techLogoList.map(item => ({ ...item, id: `${item.id}-3` })),
    ...techLogoList.map(item => ({ ...item, id: `${item.id}-4` })),
  ];

  const fullStatement = `${developerProfile.name} is a backend & AI systems engineer, building high-throughput microservices and resilient architectures in the agent-first era.`;

  // Typewriter effect for the prominent statement
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullStatement.length) {
        setTypedText(fullStatement.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [fullStatement]);

  // Infinite Scroll & Drag Physics Engine
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animId: number;
    let offset = 0;
    const autoSpeed = 0.8;
    let isDragging = false;
    let dragVelocity = 0;
    let lastX = 0;
    let lastTime = performance.now();

    const singleSetWidth = techLogoList.length * 88; // approximate item width + gap

    const updateArchPositions = () => {
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const viewportWidth = rect.width || window.innerWidth;

      const children = track.children;
      for (let i = 0; i < children.length; i++) {
        const el = children[i] as HTMLElement;
        const elRect = el.getBoundingClientRect();
        const elCenterX = elRect.left + elRect.width / 2 - rect.left;

        // Calculate screen-relative normalized horizontal position (0 to 1)
        const normalizedX = Math.max(0, Math.min(1, elCenterX / viewportWidth));
        
        // Parabolic / Sine wave arch offset
        const archY = -Math.sin(normalizedX * Math.PI) * 36 + 36;
        
        el.style.setProperty('--arch-y', `${archY}px`);
      }
    };

    const renderLoop = () => {
      if (!isDragging) {
        // Apply inertia if dragging was just released
        if (Math.abs(dragVelocity) > 0.05) {
          offset += dragVelocity;
          dragVelocity *= 0.94; // friction
        } else {
          offset += autoSpeed;
        }
      }

      // Wrap smoothly around singleSetWidth for true infinite scroll
      if (offset >= singleSetWidth) {
        offset -= singleSetWidth;
      } else if (offset <= 0) {
        offset += singleSetWidth;
      }

      if (track) {
        track.style.transform = `translate3d(-${offset}px, 0, 0)`;
        updateArchPositions();
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    // Pointer Event Handlers for Dragging
    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastTime = performance.now();
      dragVelocity = 0;
      track.style.cursor = 'grabbing';
      sounds.playClick();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const deltaX = e.clientX - lastX;

      offset -= deltaX;
      dragVelocity = -deltaX / (dt / 16); // normalize velocity

      lastX = e.clientX;
      lastTime = now;
    };

    const onPointerUp = () => {
      if (isDragging) {
        isDragging = false;
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
  }, []);

  const handleIconHover = (id: string) => {
    sounds.playHover();
    setBouncedId(id);
    setTimeout(() => {
      setBouncedId(null);
    }, 450);
  };

  return (
    <section className="relative pt-12 pb-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0b0c10] border-y border-neutral-100 dark:border-neutral-900 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Infinite Draggable Parabolic Arch Ribbon with Official Tech Logos */}
        <div className="relative w-full py-16 mb-8 overflow-hidden cursor-grab active:cursor-grabbing touch-none">
          {/* Subtle Side Fade Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white dark:from-[#0b0c10] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white dark:from-[#0b0c10] to-transparent z-10 pointer-events-none" />

          {/* Draggable Track */}
          <div
            ref={trackRef}
            className="flex items-center gap-5 sm:gap-6 will-change-transform py-4"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          >
            {repeatedLogos.map((item) => {
              const isBouncing = bouncedId === item.id;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => handleIconHover(item.id)}
                  onClick={() => sounds.playClick()}
                  data-cursor={item.name}
                  data-cursor-icon="code"
                  style={{
                    transform: `translateY(calc(var(--arch-y, 0px) + ${isBouncing ? '-20px' : '0px'})) scale(${isBouncing ? 1.18 : 1})`,
                    transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease',
                  }}
                  className={`shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer shadow-sm ${
                    isBouncing
                      ? 'bg-neutral-900 dark:bg-white shadow-2xl ring-2 ring-google-blue'
                      : 'bg-white dark:bg-[#16171d] border border-neutral-200/90 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
                  }`}
                >
                  <div className="transition-transform duration-300 pointer-events-none flex items-center justify-center">
                    {item.svg}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Google Antigravity Large Left-Aligned Statement with Beautiful Gradient Blinking Cursor */}
        <div className="max-w-4xl pl-2 sm:pl-4 pt-4">
          <div className="relative inline text-2xl sm:text-4xl md:text-5xl lg:text-[46px] font-normal tracking-tight text-neutral-900 dark:text-white leading-[1.25]">
            <span>{typedText}</span>

            {/* Exact Google Antigravity Vertical Multi-Color Gradient Blinking Caret */}
            <span
              className="inline-block w-[3px] sm:w-[3.5px] h-[0.92em] ml-1 align-middle rounded-full bg-gradient-to-b from-[#3186FF] via-[#FC413D] to-[#FBBC04] shadow-[0_0_8px_rgba(49,134,255,0.6)] animate-blink select-none"
              aria-hidden="true"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
