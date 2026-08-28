import React, { useState } from 'react';
import { sounds } from '../Sound/soundEffects';

interface LetterItem {
  char: string;
  id: string;
  rot: number;
}

export const AntigravityFooter: React.FC = () => {
  const firstName: LetterItem[] = [
    { char: 'I', id: 'fn-i', rot: -3 },
    { char: 'S', id: 'fn-s', rot: 4 },
    { char: 'R', id: 'fn-r', rot: -2 },
    { char: 'A', id: 'fn-a', rot: 5 },
    { char: 'E', id: 'fn-e', rot: -4 },
    { char: 'L', id: 'fn-l', rot: 3 },
  ];

  const lastName: LetterItem[] = [
    { char: 'A', id: 'ln-a', rot: -5 },
    { char: 'D', id: 'ln-d', rot: 4 },
    { char: 'E', id: 'ln-e', rot: -3 },
    { char: 'T', id: 'ln-t', rot: 5 },
    { char: 'U', id: 'ln-u', rot: -4 },
    { char: 'B', id: 'ln-b', rot: 3 },
    { char: 'O', id: 'ln-o', rot: -5 },
  ];

  const [lifted, setLifted] = useState<{ [key: string]: boolean }>({});

  const handleLetterHover = (id: string) => {
    sounds.playKey();
    setLifted(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setLifted(prev => ({ ...prev, [id]: false }));
    }, 1200);
  };

  const renderWord = (letters: LetterItem[]) => (
    <div className="inline-flex items-center gap-1 sm:gap-2.5 md:gap-3">
      {letters.map((item) => {
        const isFloating = lifted[item.id];
        return (
          <span
            key={item.id}
            onMouseEnter={() => handleLetterHover(item.id)}
            className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter cursor-pointer transition-all duration-700 ease-out inline-block font-mono select-none ${
              isFloating
                ? 'text-transparent bg-clip-text bg-gradient-to-t from-google-blue via-google-red to-google-yellow -translate-y-8 scale-110 drop-shadow-[0_15px_25px_rgba(49,134,255,0.4)]'
                : 'text-neutral-800 dark:text-neutral-800/90 hover:text-neutral-600 dark:hover:text-neutral-700'
            }`}
            style={{
              transform: isFloating
                ? `translateY(-32px) rotate(${item.rot * 2}deg) scale(1.15)`
                : 'translateY(0px) rotate(0deg) scale(1)',
            }}
          >
            {item.char}
          </span>
        );
      })}
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden py-16 select-none">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-google-blue/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
        <div className="flex items-center justify-center flex-wrap gap-x-6 sm:gap-x-12 gap-y-4 text-center">
          {renderWord(firstName)}
          {renderWord(lastName)}
        </div>
      </div>

      <div className="text-center mt-6 text-xs font-mono text-neutral-500 dark:text-neutral-500 tracking-widest uppercase">
        Hover letters to trigger zero-gravity physics
      </div>
    </div>
  );
};
