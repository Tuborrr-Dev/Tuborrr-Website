import React, { useEffect, useRef } from 'react';

interface PanoramicMorphingCanvasProps {
  activeZone: 'left' | 'right' | null;
  leftCenterRef: React.RefObject<HTMLDivElement | null>;
  rightCenterRef: React.RefObject<HTMLDivElement | null>;
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  targetX: number;
  targetY: number;
  color: string;
  size: number;
  side: 'left' | 'right';
  isShapeFormer: boolean; // only ~35% of dots form the shape; the rest stay as ambient background dots
  shapeIndex: number;
}

export const PanoramicMorphingCanvas: React.FC<PanoramicMorphingCanvasProps> = ({
  activeZone,
  leftCenterRef,
  rightCenterRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const totalParticles = 1700;
    const shapeParticlesPerSide = 320; // Exact subset forming the morph shape
    const particles: Particle[] = [];

    // Initialize particles: a rich ambient starfield where only a subset pulls into the shape
    for (let i = 0; i < totalParticles; i++) {
      const side: 'left' | 'right' = i < totalParticles / 2 ? 'left' : 'right';
      const sideIndex = i % (totalParticles / 2);
      const isShapeFormer = sideIndex < shapeParticlesPerSide;

      const startX = side === 'left' 
        ? Math.random() * (width * 0.5) 
        : width * 0.5 + Math.random() * (width * 0.5);
      const startY = Math.random() * height;

      // Google Antigravity subtle multi-color dots in ambient starfield
      const colors = ['#3186FF', '#4285F4', '#34A853', '#FBBC05', '#EA4335', '#1a1a1a', '#5f6368'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      particles.push({
        x: startX,
        y: startY,
        baseX: startX,
        baseY: startY,
        targetX: startX,
        targetY: startY,
        color,
        size: Math.random() * 1.5 + 1.1,
        side,
        isShapeFormer,
        shapeIndex: sideIndex,
      });
    }

    let time = 0;

    // Helper: Compute exact coordinate for Antigravity Code Curly Bracket { }
    const getCleanBracketPoint = (
      index: number,
      total: number,
      isLeft: boolean,
      cx: number,
      cy: number
    ) => {
      const sign = isLeft ? -1 : 1;
      const spineDist = 220; // Horizontal distance from center of text to bracket spine
      const halfH = 175;     // Half height of bracket
      const hookW = 55;      // Inward horizontal hook length
      const cuspW = 38;      // Outward triangular cusp depth
      const cuspH = 24;      // Cusp half height

      const t = index / total; // 0 to 1 along the bracket curve

      const spineX = cx + sign * spineDist;
      let x = spineX;
      let y = cy;

      if (t < 0.12) {
        // 1. Top horizontal hook (pointing inward toward center)
        const p = t / 0.12;
        x = spineX - sign * hookW * (1 - p);
        y = cy - halfH;
      } else if (t < 0.44) {
        // 2. Upper straight vertical spine
        const p = (t - 0.12) / 0.32;
        x = spineX;
        y = cy - halfH + p * (halfH - cuspH);
      } else if (t < 0.50) {
        // 3. Middle cusp top slope (pointing outward)
        const p = (t - 0.44) / 0.06;
        x = spineX + sign * cuspW * p;
        y = cy - cuspH + p * cuspH;
      } else if (t < 0.56) {
        // 4. Middle cusp bottom slope (returning to spine)
        const p = (t - 0.50) / 0.06;
        x = spineX + sign * cuspW * (1 - p);
        y = cy + p * cuspH;
      } else if (t < 0.88) {
        // 5. Lower straight vertical spine
        const p = (t - 0.56) / 0.32;
        x = spineX;
        y = cy + cuspH + p * (halfH - cuspH);
      } else {
        // 6. Bottom horizontal hook (pointing inward toward center)
        const p = (t - 0.88) / 0.12;
        x = spineX - sign * hookW * p;
        y = cy + halfH;
      }

      // Add double-walled ribbon thickness & subtle jitter
      const thicknessJitter = ((index % 3) - 1) * 7 + Math.sin(index * 13) * 2;
      const perpJitter = Math.cos(index * 17) * 2;

      return { x: x + thicknessJitter, y: y + perpJitter };
    };

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Measure exact DOM center coordinates from text elements
      let leftCenter = { x: width * 0.25, y: height * 0.5 };
      let rightCenter = { x: width * 0.75, y: height * 0.5 };

      if (leftCenterRef.current && canvas.parentElement) {
        const pRect = canvas.parentElement.getBoundingClientRect();
        const lRect = leftCenterRef.current.getBoundingClientRect();
        leftCenter = {
          x: lRect.left + lRect.width / 2 - pRect.left,
          y: lRect.top + lRect.height / 2 - pRect.top,
        };
      }

      if (rightCenterRef.current && canvas.parentElement) {
        const pRect = canvas.parentElement.getBoundingClientRect();
        const rRect = rightCenterRef.current.getBoundingClientRect();
        rightCenter = {
          x: rRect.left + rRect.width / 2 - pRect.left,
          y: rRect.top + rRect.height / 2 - pRect.top,
        };
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.side === 'left') {
          if (activeZone === 'left' && p.isShapeFormer) {
            // Morph this subset into the structural Code Curly Brackets { }
            const halfShape = shapeParticlesPerSide / 2;
            const isLeftBracket = p.shapeIndex < halfShape;
            const subIdx = isLeftBracket ? p.shapeIndex : p.shapeIndex - halfShape;

            const pt = getCleanBracketPoint(
              subIdx,
              halfShape,
              isLeftBracket,
              leftCenter.x,
              leftCenter.y
            );

            p.targetX = pt.x;
            p.targetY = pt.y;
          } else {
            // Ambient floating starfield motion
            p.targetX = p.baseX + Math.sin(time * 0.7 + p.shapeIndex * 0.08) * 18;
            p.targetY = p.baseY + Math.cos(time * 0.7 + p.shapeIndex * 0.08) * 18;
          }
        } else {
          if (activeZone === 'right' && p.isShapeFormer) {
            // Morph this subset into the 6-Circle Flower Ring
            const numCircles = 6;
            const circleIdx = Math.floor((p.shapeIndex / shapeParticlesPerSide) * numCircles);
            const circleT = ((p.shapeIndex % (shapeParticlesPerSide / numCircles)) / (shapeParticlesPerSide / numCircles)) * Math.PI * 2;

            const ringRadius = 145; // Hexagonal offset from center
            const circleRadius = 66; // Sub-circle radius

            // Hexagonal orientation: top (12h), top-right (2h), bottom-right (4h), bottom (6h), bottom-left (8h), top-left (10h)
            const angle = -Math.PI / 2 + (circleIdx * (Math.PI * 2) / numCircles);
            const circleCenterX = rightCenter.x + Math.cos(angle) * ringRadius;
            const circleCenterY = rightCenter.y + Math.sin(angle) * ringRadius;

            // Points around the circumference
            const isInterior = (p.shapeIndex % 6 === 0);
            const r = isInterior ? circleRadius * 0.6 : circleRadius;
            const jitter = ((p.shapeIndex % 3) - 1) * 2;

            p.targetX = circleCenterX + Math.cos(circleT) * (r + jitter);
            p.targetY = circleCenterY + Math.sin(circleT) * (r + jitter);
          } else {
            // Ambient floating starfield motion
            p.targetX = p.baseX + Math.sin(time * 0.7 + p.shapeIndex * 0.08) * 18;
            p.targetY = p.baseY + Math.cos(time * 0.7 + p.shapeIndex * 0.08) * 18;
          }
        }

        // Smooth physics easing
        p.x += (p.targetX - p.x) * 0.085;
        p.y += (p.targetY - p.y) * 0.085;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        const isShapeActive = (p.side === 'left' && activeZone === 'left' && p.isShapeFormer) ||
                              (p.side === 'right' && activeZone === 'right' && p.isShapeFormer);

        if (isShapeActive) {
          ctx.fillStyle = '#3186FF';
          ctx.shadowColor = 'rgba(49, 134, 255, 0.7)';
          ctx.shadowBlur = 4;
        } else {
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeZone, leftCenterRef, rightCenterRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
