import React, { useEffect, useState, useRef } from 'react';

interface CursorState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  visible: boolean;
  text: string;
  icon: string;
  active: boolean;
}

export const FollowCursor: React.FC = () => {
  const [cursor, setCursor] = useState<CursorState>({
    x: -100,
    y: -100,
    targetX: -100,
    targetY: -100,
    visible: false,
    text: '',
    icon: '',
    active: false,
  });

  const cursorRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef(cursor);
  stateRef.current = cursor;

  useEffect(() => {
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Check if hovering over element with custom cursor metadata
      const target = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null;
      
      if (target) {
        const text = target.getAttribute('data-cursor') || 'Explore';
        const icon = target.getAttribute('data-cursor-icon') || 'arrow';
        setCursor(prev => ({
          ...prev,
          targetX: e.clientX,
          targetY: e.clientY,
          visible: true,
          active: true,
          text,
          icon,
        }));
      } else {
        setCursor(prev => ({
          ...prev,
          targetX: e.clientX,
          targetY: e.clientY,
          visible: false,
          active: false,
        }));
      }
    };

    const handleMouseLeave = () => {
      setCursor(prev => ({ ...prev, visible: false, active: false }));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth lerp animation loop
    const loop = () => {
      const curr = stateRef.current;
      const dx = curr.targetX - curr.x;
      const dy = curr.targetY - curr.y;

      const newX = curr.x + dx * 0.18;
      const newY = curr.y + dy * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0) translate(-50%, -50%) scale(${curr.active ? 1 : 0.4})`;
        cursorRef.current.style.opacity = curr.visible ? '1' : '0';
      }

      stateRef.current.x = newX;
      stateRef.current.y = newY;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-50 will-change-transform transition-opacity duration-200"
      style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)', opacity: 0 }}
      aria-hidden="true"
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-[#121317]/90 text-neutral-900 dark:text-white rounded-full shadow-2xl border border-neutral-200/80 dark:border-neutral-700/80 backdrop-blur-md text-xs font-medium tracking-wide whitespace-nowrap">
        {cursor.icon === 'play' && (
          <span className="w-2 h-2 rounded-full bg-google-red animate-pulse" />
        )}
        {cursor.icon === 'code' && (
          <span className="w-2 h-2 rounded-full bg-google-blue animate-pulse" />
        )}
        {cursor.icon === 'spark' && (
          <span className="w-2 h-2 rounded-full bg-google-yellow animate-pulse" />
        )}
        {cursor.icon === 'arrow' && (
          <span className="w-2 h-2 rounded-full bg-google-green animate-pulse" />
        )}
        <span>{cursor.text}</span>
      </div>
    </div>
  );
};
