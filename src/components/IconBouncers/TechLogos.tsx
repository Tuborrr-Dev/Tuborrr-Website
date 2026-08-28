import React from 'react';

export interface TechItem {
  id: string;
  name: string;
  category: string;
  svg: React.ReactNode;
}

export const techLogoList: TechItem[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'Core Language',
    svg: (
      /* Exact Uploaded Python Logo Cropped in Circle */
      <img
        src="/tech/python.jpg"
        alt="Python"
        className="w-8 h-8 rounded-full object-contain shadow-sm bg-white"
      />
    )
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Language',
    svg: (
      /* Exact Uploaded JavaScript Logo Cropped in Circle */
      <img
        src="/tech/javascript.png"
        alt="JavaScript"
        className="w-8 h-8 rounded-full object-contain shadow-sm"
      />
    )
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Runtime',
    svg: (
      /* Exact Uploaded Node.js Logo Cropped in Circle */
      <img
        src="/tech/nodejs.jpg"
        alt="Node.js"
        className="w-8 h-8 rounded-full object-contain shadow-sm bg-white"
      />
    )
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Framework',
    svg: (
      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-[#1e2029]">
        <span className="font-bold text-sm text-white">ex</span>
      </div>
    )
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Framework',
    svg: (
      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-[#009688]">
        <svg className="w-5 h-5" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
          <path d="M141.5 37.1l-64.8 94.6h46.7l-14.8 87.2 64.8-94.6h-46.7l14.8-87.2z" fill="#FFFFFF"/>
        </svg>
      </div>
    )
  },
  {
    id: 'django',
    name: 'Django',
    category: 'Framework',
    svg: (
      /* Exact Uploaded Django Logo Cropped in Circle */
      <img
        src="/tech/django.png"
        alt="Django"
        className="w-8 h-8 rounded-full object-contain shadow-sm"
      />
    )
  },
  {
    id: 'flask',
    name: 'Flask',
    category: 'Framework',
    svg: (
      /* Exact Uploaded Flask Logo Cropped in Circle */
      <img
        src="/tech/flask.png"
        alt="Flask"
        className="w-8 h-8 rounded-full object-contain shadow-sm bg-black"
      />
    )
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Containerization',
    svg: (
      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-[#2496ED]">
        <svg className="w-6 h-6" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
          <g fill="#FFFFFF">
            <rect x="88" y="70" width="22" height="18" rx="2"/>
            <rect x="62" y="92" width="22" height="18" rx="2"/>
            <rect x="88" y="92" width="22" height="18" rx="2"/>
            <rect x="114" y="92" width="22" height="18" rx="2"/>
            <rect x="36" y="114" width="22" height="18" rx="2"/>
            <rect x="62" y="114" width="22" height="18" rx="2"/>
            <rect x="88" y="114" width="22" height="18" rx="2"/>
            <rect x="114" y="114" width="22" height="18" rx="2"/>
            <rect x="140" y="114" width="22" height="18" rx="2"/>
            <path d="M228 136c-4.5-3.2-12.8-5.3-21.6-4.5.6-7.8-2.2-17.5-9.4-23.2-2.8-2.2-6.5-3.6-10.8-3.6-1.5 0-3 .2-4.5.5C178 90 162 82 144 82v49H28c-3 12-1 26 6 36 12 18 34 29 60 29 55 0 98-28 116-52 6 0 13 1 18 5 3-4 5-8 6-13z"/>
            <circle cx="196" cy="142" r="3" fill="#2496ED"/>
          </g>
        </svg>
      </div>
    )
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'Systems Language',
    svg: (
      /* Exact Uploaded C++ Logo in Circle */
      <img
        src="/tech/cpp.png"
        alt="C++"
        className="w-8 h-8 rounded-full object-contain shadow-sm bg-white"
      />
    )
  },
  {
    id: 'csharp',
    name: 'C#',
    category: 'Object-Oriented',
    svg: (
      /* Exact C# Logo Preserved in Original Hexagon Shape */
      <img
        src="/tech/csharp.svg"
        alt="C#"
        className="w-8 h-8 object-contain"
      />
    )
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Relational Database',
    svg: (
      /* Exact Uploaded PostgreSQL Logo Cropped in Circle */
      <img
        src="/tech/postgres.png"
        alt="PostgreSQL"
        className="w-8 h-8 rounded-full object-contain shadow-sm"
      />
    )
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'Cache & Pub/Sub',
    svg: (
      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
        <svg className="w-7 h-7" viewBox="0 0 256 216" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 45.4L128 0l128 45.4-128 45.4L0 45.4z" fill="#DC382D"/>
          <path d="M0 109l128 45.4v61.6L0 170.6V109z" fill="#A41E11"/>
          <path d="M256 109l-128 45.4v61.6l128-45.4V109z" fill="#B92518"/>
          <path d="M0 45.4L128 90.8v63.6L0 109V45.4z" fill="#A41E11"/>
          <path d="M256 45.4L128 90.8v63.6L256 109V45.4z" fill="#B92518"/>
        </svg>
      </div>
    )
  },
  {
    id: 'selenium',
    name: 'Selenium',
    category: 'Automation',
    svg: (
      /* Exact Selenium Logo Cropped in Circle */
      <img
        src="/tech/selenium.svg"
        alt="Selenium"
        className="w-8 h-8 rounded-full object-cover shadow-sm"
      />
    )
  },
  {
    id: 'sqlalchemy',
    name: 'SQLAlchemy',
    category: 'Async ORM',
    svg: (
      /* Exact Uploaded SQLAlchemy Logo Cropped in Circle */
      <img
        src="/tech/sqlalchemy.png"
        alt="SQLAlchemy"
        className="w-8 h-8 rounded-full object-contain shadow-sm"
      />
    )
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'Data ETL',
    svg: (
      /* Exact Uploaded Pandas Logo Cropped in Circle */
      <img
        src="/tech/pandas.png"
        alt="Pandas"
        className="w-8 h-8 rounded-full object-contain shadow-sm bg-white p-0.5"
      />
    )
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Version Control',
    svg: (
      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
        <svg className="w-7 h-7" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
          <path d="M249.7 114.5L141.5 6.3c-8.4-8.4-22-8.4-30.4 0L89.4 28 119 57.6c8.9-3 19.3-.9 26.3 6.1 7 7 9.1 17.4 6.1 26.3l28.6 28.6c8.9-3 19.3-.9 26.3 6.1 9.9 9.9 9.9 26 0 35.9-9.9 9.9-26 9.9-35.9 0-7.3-7.3-9.3-18.1-5.8-27.2l-26.7-26.7v69.6c2.5 1.2 4.8 2.8 6.9 4.9 9.9 9.9 9.9 26 0 35.9-9.9 9.9-26 9.9-35.9 0-9.9-9.9-9.9-26 0-35.9 2.5-2.5 5.5-4.3 8.7-5.4V94.8c-3.2-1.1-6.2-2.9-8.7-5.4-7.3-7.3-9.3-18.1-5.8-27.2L78 39.4 6.3 111.1c-8.4 8.4-8.4 22 0 30.4l108.2 108.2c8.4 8.4 22 8.4 30.4 0l104.8-104.8c8.4-8.4 8.4-22 0-30.4z" fill="#F05032"/>
        </svg>
      </div>
    )
  },
  {
    id: 'groq-ai',
    name: 'Groq & LLMs',
    category: 'GenAI & Agents',
    svg: (
      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-[#F55036]">
        <svg className="w-5 h-5" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
          <path d="M128 48l18.5 51.5L198 118l-51.5 18.5L128 188l-18.5-51.5L58 118l51.5-18.5L128 48z" fill="#FFFFFF"/>
        </svg>
      </div>
    )
  },
  {
    id: 'pytest',
    name: 'PyTest',
    category: 'Testing & QA',
    svg: (
      /* Exact Uploaded PyTest Logo Cropped in Circle */
      <img
        src="/tech/pytest.png"
        alt="PyTest"
        className="w-8 h-8 rounded-full object-contain shadow-sm bg-white p-0.5"
      />
    )
  }
];
