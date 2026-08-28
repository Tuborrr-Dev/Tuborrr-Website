import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroParticlesProps {
  theme?: 'light' | 'dark';
}

export const HeroParticles: React.FC<HeroParticlesProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let particleSystem: THREE.Points;
    let innerRing: THREE.Points;
    let ambientParticles: THREE.Points;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 24;

    // 2. WebGL Renderer with Alpha
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Generate Primary Particle Torus (Antigravity Signature Shape)
    const particleCount = 2800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    // Antigravity Brand Palette
    const palette = [
      new THREE.Color('#3186FF'), // Google Blue
      new THREE.Color('#FC413D'), // Google Red
      new THREE.Color('#FBBC04'), // Google Yellow
      new THREE.Color('#00B95C'), // Google Green
      new THREE.Color('#749BFF'), // Light Blue
      new THREE.Color('#A8C7FA'), // Ice Blue
    ];

    const majorRadius = 9.5;
    const minorRadius = 3.2;

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;

      // Torus equations with procedural noise displacement
      const noise = (Math.random() - 0.5) * 1.2;
      const r = minorRadius + noise;
      const x = (majorRadius + r * Math.cos(v)) * Math.cos(u);
      const y = (majorRadius + r * Math.cos(v)) * Math.sin(u);
      const z = r * Math.sin(v) + (Math.random() - 0.5) * 1.5;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Color distribution based on angle and depth
      const colorIndex = Math.floor(Math.random() * palette.length);
      const color = palette[colorIndex];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      scales[i] = Math.random() * 0.8 + 0.4;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const pMaterial = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    particleSystem = new THREE.Points(geometry, pMaterial);
    particleSystem.rotation.x = Math.PI * 0.32;
    particleSystem.rotation.y = Math.PI * 0.15;
    scene.add(particleSystem);

    // 4. Generate Core Orbital Inner Ring
    const innerCount = 900;
    const innerGeo = new THREE.BufferGeometry();
    const innerPos = new Float32Array(innerCount * 3);
    const innerCol = new Float32Array(innerCount * 3);

    for (let i = 0; i < innerCount; i++) {
      const angle = (i / innerCount) * Math.PI * 2 + Math.random() * 0.05;
      const dist = 5.5 + (Math.random() - 0.5) * 0.8;
      
      innerPos[i * 3] = Math.cos(angle) * dist;
      innerPos[i * 3 + 1] = Math.sin(angle) * dist;
      innerPos[i * 3 + 2] = (Math.random() - 0.5) * 0.6;

      const c = palette[i % palette.length];
      innerCol[i * 3] = c.r;
      innerCol[i * 3 + 1] = c.g;
      innerCol[i * 3 + 2] = c.b;
    }

    innerGeo.setAttribute('position', new THREE.BufferAttribute(innerPos, 3));
    innerGeo.setAttribute('color', new THREE.BufferAttribute(innerCol, 3));

    const innerMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    innerRing = new THREE.Points(innerGeo, innerMat);
    innerRing.rotation.x = Math.PI * 0.32;
    innerRing.rotation.y = Math.PI * 0.15;
    scene.add(innerRing);

    // 5. Generate Ambient Deep-Space Floating Dust
    const ambientCount = 600;
    const ambientGeo = new THREE.BufferGeometry();
    const ambientPos = new Float32Array(ambientCount * 3);

    for (let i = 0; i < ambientCount; i++) {
      ambientPos[i * 3] = (Math.random() - 0.5) * 45;
      ambientPos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      ambientPos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    ambientGeo.setAttribute('position', new THREE.BufferAttribute(ambientPos, 3));
    ambientParticles = new THREE.Points(
      ambientGeo,
      new THREE.PointsMaterial({
        size: 0.08,
        color: 0x8ab4f8,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(ambientParticles);

    // 6. Interactive Mouse & Gyro Mechanics
    let targetRotationX = Math.PI * 0.32;
    let targetRotationY = Math.PI * 0.15;

    const onMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      targetRotationY = Math.PI * 0.15 + normX * 0.45;
      targetRotationX = Math.PI * 0.32 - normY * 0.35;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Handle Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // 7. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera and rotation response
      particleSystem.rotation.y += (targetRotationY - particleSystem.rotation.y) * 0.04 + delta * 0.12;
      particleSystem.rotation.x += (targetRotationX - particleSystem.rotation.x) * 0.04;
      particleSystem.rotation.z = Math.sin(elapsedTime * 0.2) * 0.08;

      innerRing.rotation.y -= delta * 0.22;
      innerRing.rotation.x = particleSystem.rotation.x;
      innerRing.rotation.z = particleSystem.rotation.z;

      ambientParticles.rotation.y += delta * 0.02;

      // Particle Wave Dynamics
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i += 2) {
        const idx = i * 3;
        const ox = originalPositions[idx];
        const oy = originalPositions[idx + 1];
        const oz = originalPositions[idx + 2];

        const wave = Math.sin(elapsedTime * 1.5 + ox * 0.4 + oy * 0.4) * 0.35;
        posArr[idx] = ox + Math.cos(elapsedTime * 0.8 + i) * 0.1;
        posArr[idx + 1] = oy + Math.sin(elapsedTime * 0.8 + i) * 0.1;
        posArr[idx + 2] = oz + wave;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      innerGeo.dispose();
      ambientGeo.dispose();
      pMaterial.dispose();
      innerMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden flex items-center justify-center"
      aria-hidden="true"
    />
  );
};
