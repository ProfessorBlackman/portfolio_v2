export interface CsvRowData {
  _type: 'csvRow'
  _key: string
  cells: string[]
}

export interface CsvTableData {
  data: CsvRowData[]
}

export interface ProjectMedia {
  _type: 'image' | 'video';
  url: string;
  caption?: string;
}

export interface Project {
  _id: string;
  id?: string;
  title: string;
  description?: string;
  fullDescription?: string;
  image?: string;
  tags?: string[];
  githubUrl?: string;
  githubLink?: string;
  liveUrl?: string;
  liveLink?: string;
  features?: string[];
  techStack?: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    others?: string[];
  };
  technologies?: string[];
  status?: 'Completed' | 'In Progress' | 'Planned';
  statusOld?: 'Completed' | 'In Progress' | 'Planned';
  architecture?: string;
  category?: string;
  media?: ProjectMedia[];
}

export interface Experience {
  _id: string;
  title: string;
  role?: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  period?: string;
  achievements?: string[];
  description?: string[];
}

export interface Article {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  publishedAt: string;
  date?: string;
  image?: string;
  body?: any[]; // Portable Text
  content?: any; // For Portable Text
  excerpt?: string;
  tags?: string[];
  category?: string;
  duration?: string;
  dateCreated?: string;
  references?: { title: string; author: string; link?: string; year: string }[];
}

export interface Skill {
  _id: string;
  name: string;
  category?: 'languages' | 'frameworks' | 'databases' | 'cloud' | 'cicd' | 'monitoring' | 'tools' | 'backend' | 'security' | 'interests';
  proficiency?: number;
  level?: number; // 0-100
  icon?: string;
  type?: string;
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
  description?: string;
}
