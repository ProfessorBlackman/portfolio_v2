export interface CsvRowData {
  _type: 'csvRow'
  _key: string
  cells: string[]
}

export interface CsvTableData {
  data: CsvRowData[]
}

export interface ProjectMedia {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

export interface Project {
  _id: string;
  id?: string;
  title: string;
  description?: string;
  details?: string;
  image?: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  features?: string[];
  techStack?: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    others?: string[];
  };
  status?: 'Completed' | 'In Progress' | 'Planned';
  architecture?: string;
  category?: string;
  media?: ProjectMedia[];
}

export interface Experience {
  _id: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  achievements?: string[];
  description?: string[];
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  image?: string;
  body: any[]; // Portable Text
  excerpt: string;
  tags?: string[];
  category?: string;
  duration?: string;
  references?: { title: string; author: string; link?: string; year: string }[];
}

export interface Skill {
  _id: string;
  name: string;
  category?: 'languages' | 'frameworks' | 'databases' | 'cloud' | 'ci/cd' | 'monitoring' | 'tools' | 'backend' | 'security' | 'interests' | 'other' | 'mobile';
  proficiency?: number;
  icon?: string;
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
  overview: any[];
  client: string;
  author: string;
  date: string;
  coverImage: string;
  problem: any[];
  background: any[];
  methodology: any[];
  investigation: any[];
  findings: any[];
  solution: any[];
  implementation: any[];
  results: any[];
  metrics: { label: string; value: string }[];
  media: CaseStudyMedia[];
  conclusion: any[];
  references: { title: string; author: string; link?: string; year: string }[];
  appendix: any[];
  duration: string;
  seoDescription: string;
  tags: string[];
}

export interface Profile {
  _id: string;
  name: string;
  profession: string;
  headline: string;
  image?: string;
  subtitle?: string;
  shortBio?: string;
  fullBio?: any[];
  focusAreas?: any[];
  thoughtProcess?: any[];
  values?: string;
  cta?: any[];
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  resume?: string;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  type: 'education' | 'certification';
  certificateUrl?: string;
  description?: string;
}
