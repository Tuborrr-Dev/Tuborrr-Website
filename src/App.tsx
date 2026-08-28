import React, { useState } from 'react';
import { Header } from './components/Navigation/Header';
import { HeroSection } from './components/Hero/HeroSection';
import { CursorGrid } from './components/Background/CursorGrid';
import { FloatingIcons } from './components/IconBouncers/FloatingIcons';
import { FeatureExplorer } from './components/FeatureExplorer/FeatureExplorer';
import { Testimonials } from './components/Testimonials/Testimonials';
import { ProjectSlider } from './components/UseCases/ProjectSlider';
import { DualSolutions } from './components/MorphingParticles/DualSolutions';
import { LatestArticles } from './components/Blogs/LatestArticles';
import { AntigravityFooter } from './components/Footer/AntigravityFooter';
import { FooterLinks } from './components/Footer/FooterLinks';
import { FollowCursor } from './components/Cursor/FollowCursor';
import { TerminalEmulator } from './components/FeatureExplorer/TerminalEmulator';

export const App: React.FC = () => {
  const [terminalModalOpen, setTerminalModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#fbfbfd] dark:bg-[#0b0c10] text-neutral-900 dark:text-[#f0f2f5] overflow-x-hidden selection:bg-google-blue/30 selection:text-white">
      {/* Dynamic Magnetic Cursor Follower */}
      <FollowCursor />

      {/* Cursor-Responsive Glowing Matrix Grid Background */}
      <CursorGrid gridSize={40} dotSize={1.2} />

      {/* Navigation Header */}
      <Header onOpenTerminal={() => setTerminalModalOpen(true)} />

      {/* Main Page Content */}
      <main className="relative z-10">
        {/* 1. Hero Liftoff Section with 3D Particle Torus & Typewriter */}
        <HeroSection onOpenTerminal={() => setTerminalModalOpen(true)} />

        {/* 2. Interactive Physics Floating Icon Bouncers */}
        <FloatingIcons />

        {/* 3. Feature Explorer & Developer Workstation (Architectural Pillars) */}
        <FeatureExplorer />

        {/* 4. Peer Collaboration & Testimonials (Directly After Architectural Pillars) */}
        <Testimonials />

        {/* 5. Selected Use Cases & Projects Slider */}
        <ProjectSlider />

        {/* 6. Dual Collaboration Solutions with 3D Morphing Particles */}
        <DualSolutions />

        {/* 7. Engineering Deep Dives & Articles */}
        <LatestArticles />

        {/* 8. Interactive Physics Letter Gravity Footer */}
        <AntigravityFooter />
      </main>

      {/* Footer Navigation & Links */}
      <FooterLinks />

      {/* Interactive Terminal Modal */}
      {terminalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <TerminalEmulator
            isModal={true}
            onClose={() => setTerminalModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default App;
