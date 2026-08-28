import React, { useState } from 'react';
import { featureTiers } from '../../data/portfolioConfig';
import { TerminalEmulator } from './TerminalEmulator';
import { sounds } from '../Sound/soundEffects';
import { 
  Bot, 
  Terminal, 
  Layers, 
  Cpu, 
  Copy, 
  Check, 
  ArrowRight,
  ExternalLink,
  Code2,
  CheckCircle2
} from 'lucide-react';

export const FeatureExplorer: React.FC = () => {
  const [activeTierId, setActiveTierId] = useState(featureTiers[0].id);
  const [copied, setCopied] = useState(false);
  const [showTerminalDemo, setShowTerminalDemo] = useState(false);

  const activeTier = featureTiers.find(t => t.id === activeTierId) || featureTiers[0];

  const handleCopyCode = () => {
    sounds.playClick();
    navigator.clipboard.writeText(activeTier.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTierIcon = (id: string) => {
    switch (id) {
      case 'agents': return <Bot className="w-4 h-4 text-google-blue" />;
      case 'cli': return <Terminal className="w-4 h-4 text-google-green" />;
      case 'fullstack': return <Cpu className="w-4 h-4 text-google-yellow" />;
      case 'frontend': return <Layers className="w-4 h-4 text-google-red" />;
      default: return <Code2 className="w-4 h-4" />;
    }
  };

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 text-neutral-800 dark:text-neutral-200 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <span>Architectural Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Next-gen engineering surface
          </h2>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-md text-base sm:text-lg">
          Explore the modular systems, autonomous multi-agent pipelines, and high-velocity developer tools I build.
        </p>
      </div>

      {/* Tab Navigation Pill Group */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-neutral-100 dark:bg-[#121317] rounded-2xl border border-neutral-200 dark:border-neutral-800/80 mb-12 max-w-3xl">
        {featureTiers.map((tier) => {
          const isActive = tier.id === activeTierId;
          return (
            <button
              key={tier.id}
              onClick={() => {
                sounds.playClick();
                setActiveTierId(tier.id);
                setShowTerminalDemo(tier.id === 'cli');
              }}
              data-cursor={tier.badge}
              data-cursor-icon="code"
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-white dark:bg-[#1f212a] text-neutral-900 dark:text-white shadow-md border border-neutral-200/80 dark:border-neutral-700'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-neutral-800/50'
              }`}
            >
              {getTierIcon(tier.id)}
              <span>{tier.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Feature Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Description & Feature Bullets */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 shadow-sm">
            {activeTier.badge}
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            {activeTier.subtitle}
          </h3>

          <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed">
            {activeTier.description}
          </p>

          {/* Feature List */}
          <div className="space-y-3 pt-2">
            {activeTier.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                <CheckCircle2 className="w-5 h-5 text-google-green shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="pt-4">
            {activeTier.id === 'cli' ? (
              <button
                onClick={() => {
                  sounds.playClick();
                  setShowTerminalDemo(true);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-google-green hover:bg-emerald-600 transition-colors shadow-lg shadow-google-green/20"
              >
                <Terminal className="w-4 h-4" />
                <span>Try Live CLI in Browser</span>
              </button>
            ) : (
              <a
                href={activeTier.actionUrl || '#projects'}
                target={activeTier.actionExternal ? '_blank' : undefined}
                rel={activeTier.actionExternal ? 'noopener noreferrer' : undefined}
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors border border-neutral-200 dark:border-neutral-700"
              >
                <span>{activeTier.actionText}</span>
                {activeTier.actionExternal ? (
                  <ExternalLink className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Code Sandbox / Live Terminal View */}
        <div className="lg:col-span-7">
          {showTerminalDemo && activeTier.id === 'cli' ? (
            <TerminalEmulator />
          ) : (
            <div className="rounded-2xl bg-[#0e0f14] border border-neutral-800 shadow-2xl overflow-hidden font-mono">
              {/* Code Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#16171d] border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-google-red/70 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-google-yellow/70 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-google-green/70 inline-block" />
                  </div>
                  <span className="ml-3 text-xs text-neutral-400 font-mono">
                    {activeTier.id}.{activeTier.language === 'python' ? 'py' : activeTier.language === 'go' ? 'go' : 'ts'}
                  </span>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-google-green" />
                      <span className="text-google-green">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Snippet Content with Syntax Styling */}
              <pre className="p-6 text-xs sm:text-sm text-neutral-200 overflow-x-auto leading-relaxed max-h-[460px] select-text">
                <code>{activeTier.codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
