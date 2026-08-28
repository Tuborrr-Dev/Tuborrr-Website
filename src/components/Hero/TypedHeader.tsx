import React, { useEffect, useState } from 'react';
import { sounds } from '../Sound/soundEffects';

interface TypedHeaderProps {
  prefix?: string;
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  pauseTime?: number;
  className?: string;
  cursorPersists?: boolean;
}

export const TypedHeader: React.FC<TypedHeaderProps> = ({
  prefix = "Building ",
  strings,
  typeSpeed = 45,
  backSpeed = 25,
  pauseTime = 2200,
  className = "",
  cursorPersists = true,
}) => {
  const [currentText, setCurrentText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const fullText = strings[stringIndex % strings.length];

    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting) {
      if (currentText.length < fullText.length) {
        timeout = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
          if (Math.random() > 0.4) {
            sounds.playKey();
          }
        }, typeSpeed + (Math.random() * 20 - 10));
      } else {
        setIsWaiting(true);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length - 1));
        }, backSpeed);
      } else {
        setIsDeleting(false);
        setStringIndex(prev => (prev + 1) % strings.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isWaiting, stringIndex, strings, typeSpeed, backSpeed, pauseTime]);

  return (
    <span className={`inline relative ${className}`}>
      {prefix && (
        <span className="text-neutral-900 dark:text-neutral-100 font-semibold mr-2.5">
          {prefix}
        </span>
      )}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue via-google-red to-google-yellow font-bold">
        {currentText}
      </span>

      {/* Exact Google Antigravity Vertical Multi-Color Gradient Blinking Caret - Inline Glued */}
      {(cursorPersists || isWaiting || !isDeleting) && (
        <span
          className="inline-block w-[3.5px] md:w-[4px] h-[0.85em] ml-1.5 align-baseline translate-y-[2px] rounded-full bg-gradient-to-b from-[#3186FF] via-[#FC413D] to-[#FBBC04] shadow-[0_0_10px_rgba(49,134,255,0.7)] animate-blink select-none"
          aria-hidden="true"
        />
      )}
    </span>
  );
};
