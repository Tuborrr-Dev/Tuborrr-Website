import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MorphingCanvasProps {
  shape: 'sphere' | 'cube';
  color: string;
  isHovered?: boolean;
}

export const MorphingCanvas: React.FC<MorphingCanvasProps> = ({
  shape = 'sphere',
  color = '#3186FF',
  isHovered = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(isHovered);
  hoverRef.current = isHovered;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 200;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const count = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const original = new Float32Array(count * 3);

    const baseColor = new THREE.Color(color);

    for (let i = 0; i < count; i++) {
      let x = 0, y = 0, z = 0;
      if (shape === 'sphere') {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 2.4 + (Math.random() - 0.5) * 0.4;
        const sinPhi = Math.sin(phi);
        x = r * sinPhi * Math.cos(theta);
        y = r * sinPhi * Math.sin(theta);
        z = r * Math.cos(phi);
      } else {
        // Cube
        const side = 3.6;
        x = (Math.random() - 0.5) * side;
        y = (Math.random() - 0.5) * side;
        z = (Math.random() - 0.5) * side;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      original[i * 3] = x;
      original[i * 3 + 1] = y;
      original[i * 3 + 2] = z;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.12,
      color: baseColor,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const speed = hoverRef.current ? 1.8 : 0.6;

      points.rotation.y += 0.008 * speed;
      points.rotation.x += 0.004 * speed;

      const posArr = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        const ox = original[idx];
        const oy = original[idx + 1];
        const oz = original[idx + 2];

        const wave = Math.sin(elapsed * 2.0 + ox * 2.0) * (hoverRef.current ? 0.35 : 0.15);
        posArr[idx] = ox + Math.cos(elapsed * 1.5 + i) * wave;
        posArr[idx + 1] = oy + Math.sin(elapsed * 1.5 + i) * wave;
        posArr[idx + 2] = oz + wave;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [shape, color]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
