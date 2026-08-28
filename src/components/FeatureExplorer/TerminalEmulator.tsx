import React, { useState, useRef, useEffect } from 'react';
import { developerProfile, projectItems, skillCategories } from '../../data/portfolioConfig';
import { sounds } from '../Sound/soundEffects';
import { Terminal, X, Maximize2, Minimize2, Copy, Check } from 'lucide-react';

interface TerminalEmulatorProps {
  onClose?: () => void;
  isModal?: boolean;
}

interface CommandHistory {
  id: string;
  command: string;
  output: React.ReactNode;
  time: string;
}

export const TerminalEmulator: React.FC<TerminalEmulatorProps> = ({ onClose, isModal = false }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      id: 'welcome',
      command: '',
      output: (
        <div className="space-y-2 text-neutral-300 font-mono text-xs sm:text-sm">
          <div className="text-google-blue font-bold">
            🚀 Israel Adetubo CLI [Version 2.4.0-agentic]
          </div>
          <div className="text-neutral-400">
            Software & AI Systems Engineer. Type <span className="text-google-yellow font-semibold">help</span> to explore commands.
          </div>
        </div>
      ),
      time: '12:00:00'
    }
  ]);

  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    sounds.playKey();

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    let output: React.ReactNode;

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1.5 text-xs sm:text-sm font-mono text-neutral-300">
            <div className="text-google-blue font-semibold">Available Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
              <div><span className="text-google-green font-bold">whoami</span> - Display developer profile & bio</div>
              <div><span className="text-google-green font-bold">skills</span> - List engineering competencies</div>
              <div><span className="text-google-green font-bold">projects</span> - View featured backend & AI projects</div>
              <div><span className="text-google-green font-bold">experience</span> - View career history & companies</div>
              <div><span className="text-google-green font-bold">education</span> - University degree & certifications</div>
              <div><span className="text-google-green font-bold">contact</span> - Email, GitHub & LinkedIn links</div>
              <div><span className="text-google-green font-bold">cat resume.md</span> - Print full markdown resume</div>
              <div><span className="text-google-green font-bold">sound</span> - Toggle tactile audio synthesizer</div>
              <div><span className="text-google-green font-bold">clear</span> - Wipe terminal output</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="space-y-2 text-xs sm:text-sm font-mono text-neutral-300">
            <div className="text-google-yellow font-bold">{developerProfile.name}</div>
            <div className="text-neutral-400">{developerProfile.role} • {developerProfile.location}</div>
            <p className="text-neutral-300 leading-relaxed">{developerProfile.bio}</p>
            <div className="text-google-green font-semibold">Status: {developerProfile.status}</div>
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="space-y-3 text-xs sm:text-sm font-mono text-neutral-300">
            <div className="text-google-blue font-bold">Work Experience:</div>
            <div className="pl-2 border-l-2 border-google-blue/40 space-y-1">
              <div className="text-white font-bold">Software Engineer (Contract) • Koin-Koin Ltd (2024–2025)</div>
              <div className="text-neutral-400">Ikoyi, Lagos</div>
              <ul className="list-disc pl-4 space-y-0.5 text-neutral-300 text-xs">
                <li>Built Selenium automation scripts to extract realtime campaign & engagement data, eliminating 7+ hrs weekly manual reporting.</li>
                <li>Maintained automation pipelines achieving 99%+ script reliability and cutting production failures by ~80%.</li>
              </ul>
            </div>
            <div className="pl-2 border-l-2 border-google-yellow/40 space-y-1">
              <div className="text-white font-bold">Data Analyst / Marketing Associate (Remote) • Binance Africa (2022–2024)</div>
              <div className="text-neutral-400">Lagos, NG</div>
              <ul className="list-disc pl-4 space-y-0.5 text-neutral-300 text-xs">
                <li>Scraped & analyzed user engagement metrics across 13 African campaigns and 350+ user records using BeautifulSoup.</li>
                <li>Optimized data retrieval & storage pipelines, reducing extraction latency by 20%.</li>
              </ul>
            </div>
            <div className="pl-2 border-l-2 border-google-green/40 space-y-1">
              <div className="text-white font-bold">Brewing Trainee (Intern) • Nigerian Breweries PLC (2023–2024)</div>
              <div className="text-neutral-400">Sango-Ota, Ogun</div>
              <ul className="list-disc pl-4 space-y-0.5 text-neutral-300 text-xs">
                <li>Engineered Python automation scripts (Pandas, Openpyxl) parsing 17 industrial brewing forms/week, reducing processing time by 70%.</li>
              </ul>
            </div>
          </div>
        );
        break;

      case 'education':
        output = (
          <div className="space-y-2 text-xs sm:text-sm font-mono text-neutral-300">
            <div className="text-google-blue font-bold">Education & Academic Background:</div>
            <div className="pl-2 border-l-2 border-google-blue/40">
              <div className="font-bold text-white">Crawford University (07/2020 – 10/2024)</div>
              <div className="text-neutral-400">Bachelor of Science in Biochemistry • CGPA: 4.42 / 5.00</div>
              <div className="text-google-yellow text-xs">Distinguished Academician of the National Association of Biochemistry Students</div>
            </div>
            <div className="text-google-green font-bold pt-2">Certifications:</div>
            <ul className="list-disc pl-6 space-y-0.5 text-neutral-300 text-xs">
              <li><span className="text-white font-semibold">CS50X</span> — Harvard EdX</li>
              <li><span className="text-white font-semibold">Google Digital Marketing & E-commerce</span> — Google Digital Academy</li>
              <li><span className="text-white font-semibold">AI Fluency (Microsoft)</span> — International Organisation of Employers (IOE)</li>
            </ul>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-3 text-xs sm:text-sm font-mono">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-google-blue font-bold">{cat.title}:</div>
                <div className="flex flex-wrap gap-2 pl-2">
                  {cat.skills.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                      {s.name} <span className="text-google-yellow">({s.level})</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs sm:text-sm font-mono">
            <div className="text-google-blue font-bold">Featured Projects:</div>
            {projectItems.map((p, idx) => (
              <div key={idx} className="pl-2 border-l-2 border-google-blue/40 space-y-1 my-2">
                <div className="font-bold text-white flex items-center gap-2">
                  <span>{p.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-google-blue/20 text-google-blue">{p.category}</span>
                </div>
                <div className="text-neutral-400">{p.description}</div>
                <div className="text-xs text-google-green">Stack: {p.techStack.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1.5 text-xs sm:text-sm font-mono text-neutral-300">
            <div className="text-google-blue font-bold">Connect With Israel Adetubo:</div>
            <div>📧 Email: <a href="mailto:israeltubo@gmail.com" className="text-google-blue underline">israeltubo@gmail.com</a></div>
            <div>🐙 GitHub: <a href="https://github.com/Tuborrr-Dev" target="_blank" rel="noreferrer" className="text-google-blue underline">https://github.com/Tuborrr-Dev</a></div>
            <div>💼 LinkedIn: <a href="https://www.linkedin.com/in/adetubo-israel/" target="_blank" rel="noreferrer" className="text-google-blue underline">https://www.linkedin.com/in/adetubo-israel/</a></div>
            <div>✍️ Medium: <a href="https://medium.com/@israeltubo/e047b9393f67?sharedUserId=israeltubo" target="_blank" rel="noreferrer" className="text-google-blue underline">https://medium.com/@israeltubo</a></div>
            <div>📞 Phone: <span className="text-neutral-300">+234-8077503803</span></div>
          </div>
        );
        break;

      case 'cat resume.md':
      case 'resume':
        output = (
          <div className="space-y-3 text-xs sm:text-sm font-mono text-neutral-300 bg-neutral-900/90 p-4 rounded-xl border border-neutral-800">
            <div className="text-google-red font-bold text-base"># ISRAEL ADETUBO</div>
            <div className="text-neutral-400">israeltubo@gmail.com • +234-8077503803 • github.com/Tuborrr-Dev • linkedin.com/in/adetubo-israel</div>
            <div className="text-google-yellow font-bold">## PROFILE</div>
            <p className="text-neutral-300 leading-relaxed">{developerProfile.bio}</p>
            <div className="text-google-green font-bold">## TECHNICAL SKILLS</div>
            <p className="text-neutral-400">
              <strong className="text-white">Languages:</strong> Python, C++, C#, SQL<br/>
              <strong className="text-white">Frameworks & Tools:</strong> FastAPI, Django, Flask, SQLAlchemy, Docker, Git, PyTest, Selenium, BeautifulSoup, Pandas, Redis, Pydantic.<br/>
              <strong className="text-white">Databases:</strong> PostgreSQL, MySQL, SQLite
            </p>
            <div className="text-google-blue font-bold">## EXPERIENCE</div>
            <div className="text-neutral-300">
              • Software Engineer (Contract) @ Koin-Koin Ltd (2024–2025)<br/>
              • Data Analyst / Marketing Associate @ Binance Africa (2022–2024)<br/>
              • Brewing Trainee @ Nigerian Breweries PLC (2023–2024)
            </div>
            <div className="text-google-yellow font-bold">## EDUCATION</div>
            <div className="text-neutral-300">
              Crawford University — B.Sc. in Biochemistry (4.42/5.00 CGPA)
            </div>
          </div>
        );
        break;

      case 'sound':
        const nextState = sounds.toggleSound();
        output = (
          <div className="text-xs sm:text-sm font-mono text-google-yellow">
            Tactile Audio Synthesizer: {nextState ? 'ENABLED' : 'MUTED'}
          </div>
        );
        break;

      default:
        output = (
          <div className="text-xs sm:text-sm font-mono text-google-red">
            command not found: "{cmd}". Type <span className="text-google-yellow font-bold">help</span> to view commands.
          </div>
        );
    }

    setHistory(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        command: cmd,
        output,
        time: new Date().toLocaleTimeString()
      }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (input.trim()) {
        handleCommand(input);
        setInput('');
      }
    }
  };

  const copyTerminalOutput = () => {
    sounds.playClick();
    const text = history.map(h => `$ ${h.command}\n`).join('');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex flex-col bg-[#0d0e12] rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden font-mono transition-all duration-300 ${
        isModal ? 'w-full max-w-4xl h-[620px]' : isExpanded ? 'h-[650px]' : 'h-[460px]'
      }`}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#14151b] border-b border-neutral-800 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-google-red/80 hover:bg-google-red cursor-pointer inline-block" onClick={onClose} />
            <span className="w-3 h-3 rounded-full bg-google-yellow/80 hover:bg-google-yellow cursor-pointer inline-block" onClick={() => setIsExpanded(!isExpanded)} />
            <span className="w-3 h-3 rounded-full bg-google-green/80 hover:bg-google-green cursor-pointer inline-block" />
          </div>
          <div className="flex items-center gap-2 ml-3 text-xs text-neutral-400">
            <Terminal className="w-3.5 h-3.5 text-google-blue" />
            <span>Tuborrr@israetubo: ~/workspace</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyTerminalOutput}
            className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
            title="Copy session"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-google-green" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          {!isModal && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Terminal Body */}
      <div
        className="flex-1 p-4 overflow-y-auto space-y-4 text-neutral-200 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map(item => (
          <div key={item.id} className="space-y-1.5">
            {item.command && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400">
                <span className="text-google-green font-bold">➜</span>
                <span className="text-google-blue">~/workspace</span>
                <span className="text-neutral-100 font-semibold">$ {item.command}</span>
              </div>
            )}
            <div>{item.output}</div>
          </div>
        ))}

        {/* Active Command Prompt */}
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-google-green font-bold">➜</span>
          <span className="text-google-blue">~/workspace</span>
          <span className="text-neutral-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-white font-mono p-0 focus:ring-0"
            autoFocus
            spellCheck={false}
            placeholder="Type 'help' or 'cat resume.md'..."
          />
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
