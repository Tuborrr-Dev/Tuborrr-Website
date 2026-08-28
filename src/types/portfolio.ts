export interface ProjectItem {
  id: string;
  title: string;
  category: 'Fullstack' | 'AI Agents' | '3D & Graphics' | 'Systems' | 'Frontend';
  tagline: string;
  description: string;
  longDescription: string;
  highlights: string[];
  techStack: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    icon: string;
    category: string;
    featured?: boolean;
  }[];
}

export interface FeatureTier {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  codeSnippet: string;
  language: string;
  badge: string;
  actionText: string;
  actionUrl?: string;
  actionExternal?: boolean;
  features: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  slug: string;
  link?: string;
}

export interface DeveloperProfile {
  name: string;
  role: string;
  tagline: string;
  heroTypewriterPrefix: string;
  heroTypewriterTexts: string[];
  bio: string;
  status: string;
  location: string;
  yearsOfExperience: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    discord?: string;
    youtube?: string;
    email: string;
  };
  resumeUrl: string;
}
