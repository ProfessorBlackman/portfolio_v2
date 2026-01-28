
export interface ProjectMedia {
  _type: 'image' | 'video';
  url: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  status: 'Completed' | 'In Progress';
  tags: string[];
  image: string;
  category: string;
  githubLink?: string;
  liveLink?: string;
  technologies?: string[];
  media?: ProjectMedia[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: any; // For Portable Text
  tags: string[];
  category: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  type: string;
}

export interface CaseStudyMedia {
  _type: 'image' | 'video';
  url: string;
  caption?: string;
}

export interface CaseStudy {
  _id: string;
  title: string;
  subtitle: string;
  slug: string;
  overview: string[];
  client: string;
  author: string;
  date: string;
  coverImage: string;
  problem: string[];
  background: string[];
  methodology: string[];
  investigation: string[];
  findings: string[];
  solution: string[];
  implementation: string[];
  results: string[];
  metrics: { label: string; value: string }[];
  media: CaseStudyMedia[];
  conclusion: string[];
  references: { title: string; author: string; link?: string; year: string }[];
  appendix: string[];
  duration: string;
  seoDescription: string;
  tags: string[];
}
