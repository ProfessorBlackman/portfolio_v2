
import React from 'react';
import { Project, Experience, Article, Skill, CaseStudy } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Asanka',
    description: 'A platform promoting Ghanaian cuisine with features for creating, editing, and sharing recipes.',
    fullDescription: 'Asanka is a comprehensive culinary platform designed to preserve and promote Ghanaian gastronomic heritage. The application allows users to discover authentic local recipes, contribute their own variations, and build a community around food. Built with a robust backend to handle high-resolution imagery and complex recipe structures, it prioritizes performance and accessibility.',
    status: 'Completed',
    tags: ['React', 'Next.js', 'Firebase'],
    technologies: ['React', 'Next.js', 'Firebase Auth', 'Firestore', 'Tailwind CSS', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1547517023-7ca0c162f816?auto=format&fit=crop&q=80&w=800',
    category: 'Fullstack',
    githubLink: 'https://github.com',
    liveLink: 'https://asanka.app',
    media: [
      { _type: 'image', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800', caption: 'Mobile interface for recipe discovery.' },
      { _type: 'image', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800', caption: 'Curated dashboard with fresh ingredients focus.' }
    ]
  },
  {
    id: '2',
    title: 'MdArr',
    description: 'A mobile app that lets music groups plan songs to practice and sing at events.',
    fullDescription: 'MdArr (Music Director Arranger) solves the logistical nightmare of repertoire management for choirs and music groups. It features collaborative song list building, PDF sheet music hosting, and a voting system for upcoming performances. The app utilizes offline-first principles ensuring that users can access their music even in basements or areas with poor reception.',
    status: 'Completed',
    tags: ['Flutter', 'Firebase', 'Music'],
    technologies: ['Flutter', 'Dart', 'Firebase Realtime Database', 'Cloud Functions', 'Local Storage'],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    category: 'Mobile',
    githubLink: 'https://github.com',
    media: [
      { _type: 'image', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800', caption: 'Real-time collaborative planning view.' }
    ]
  },
  {
    id: '3',
    title: 'MedVerify',
    description: 'A tech solution to identify genuine vs fake drug products using real-time barcode scanning.',
    fullDescription: 'MedVerify targets the counterfeit medication crisis in emerging markets. By leveraging computer vision and a secure distributed ledger, it allows pharmacists and consumers to verify the authenticity of medicine packaging in seconds. The backend handles complex verification logic against a global database of pharmaceutical manufacturers.',
    status: 'In Progress',
    tags: ['Python', 'Machine Learning', 'API'],
    technologies: ['Python', 'FastAPI', 'TensorFlow', 'PostgreSQL', 'Docker'],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=800',
    category: 'Backend',
    githubLink: 'https://github.com'
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'exp1',
    role: 'Associate Software Developer',
    company: 'Amalitech Ghana',
    period: '2025-01-01 - Present',
    description: [
      'Developed AI-powered solutions including a code analysis tool.',
      'Designed microservices architectures for scalability.',
      'Mentored junior developers fostering team growth.'
    ]
  },
  {
    id: 'exp2',
    role: 'Junior Software Developer',
    company: 'Amalitech Ghana',
    period: '2023-10-01 - 2024-12-31',
    description: [
      'Worked in a team to build an in-vehicle infotainment system.',
      'Identified and resolved multiple bugs in the core engine.',
      'Assumed leadership for occasional stand-up meetings.'
    ]
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art1',
    title: 'Why Your Cloud-First Health App Will Fail in Africa',
    slug: 'why-your-cloud-first-health-app-will-fail-in-africa',
    date: 'January 19, 2026',
    excerpt: 'When internet uptime drops below 40%, your microservices architecture becomes a liability...',
    content: 'The architectural decisions made in Silicon Valley often assume a level of infrastructure reliability that simply does not exist in many parts of the world. In Ghana, for instance, a healthcare application that relies on real-time cloud sync to function will inevitably fail during a surgery or a critical patient checkup when the fiber line is cut or the tower loses power. \n\nWe need to build systems that are "Local-First". This means using robust synchronization protocols, local storage, and conflict resolution that treats connectivity as an optional luxury rather than a hard requirement.',
    tags: ['Distributed Systems', 'Health Interoperability', 'Africa'],
    category: 'Health System'
  },
  {
    id: 'art2',
    title: 'Understanding Clocks in Software Development',
    slug: 'understanding-clocks-in-software-development',
    date: 'November 25, 2025',
    excerpt: 'Timekeeping is a fundamental aspect of software systems, yet choosing the right clock is often overlooked...',
    content: 'In distributed systems, time is a lie. Between clock drift, leap seconds, and NTP adjustments, you can never truly rely on two machines having the same "now". This article explores monotonic vs wall-clock time, and why your timeout logic might be broken if you are using the wrong one.',
    tags: ['System Design', 'Time', 'Backend'],
    category: 'Software Engineering'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Java', level: 90, type: 'Backend' },
  { name: 'Python', level: 85, type: 'Backend' },
  { name: 'TypeScript', level: 88, type: 'Fullstack' },
  { name: 'Spring Boot', level: 80, type: 'Backend' },
  { name: 'Flutter', level: 75, type: 'Mobile' },
  { name: 'SQL/NoSQL', level: 85, type: 'Database' }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    _id: 'cs1',
    title: 'Resilient Health Data Routing',
    subtitle: 'Overcoming Infrastructure Failures with Edge-First Interoperability',
    slug: 'resilient-health-data-routing',
    overview: [
      'This study explores the implementation of a distributed health information exchange (HIE) protocol optimized for low-connectivity environments.',
      'We addressed the challenge of data fragmentation in remote clinics where traditional cloud-only solutions failed consistently.'
    ],
    client: 'GHS Interop Initiative',
    author: 'Methuselah Nwodobeh',
    date: '2025-08-15',
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
    problem: [
      ' clinics in rural areas faced 60% daily downtime for internet services.',
      'Patient records remained trapped in local silos, leading to duplicate treatments and dangerous drug interactions when patients moved between facilities.'
    ],
    background: [
      'The regional health directorate required a centralized view of patient longitudinal records, yet budget constraints prevented the installation of satellite internet in all 400+ remote sites.'
    ],
    methodology: [
      'We adopted an "Asynchronous Store-and-Forward" architecture using local-first databases (Couchbase Lite).',
      'The system used physical transport (encrypted USB relays) as a fallback mechanism for the most remote areas.'
    ],
    investigation: [
      'User shadowing at 12 clinics revealed that nursing staff were often manual-syncing data after hours in towns with better coverage.'
    ],
    findings: [
      'Synchronous REST APIs were the primary failure point. Shifting to an event-based ledger improved record delivery success by 85%.'
    ],
    solution: [
      'Developed a custom middleware layer in Java/Spring Boot that abstracts the synchronization layer from the clinician UI.'
    ],
    implementation: [
      'Phased rollout across 20 pilot clinics over 6 months, using local servers powered by solar backup.'
    ],
    results: [
      'The system maintained 99.9% uptime for local record access and successfully synced 100k+ records with an average delay of 4 hours, down from days.'
    ],
    metrics: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'Sync Success', value: '85%+' },
      { label: 'Latency Reduction', value: '94%' }
    ],
    media: [
      { _type: 'image', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', caption: 'Data visualization of sync clusters across the pilot region.' }
    ],
    conclusion: [
      'Context-aware architecture is non-negotiable for software deployed in resource-constrained environments.'
    ],
    references: [
      { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', year: '2017' }
    ],
    appendix: ['Detailed protocol spec v1.2'],
    duration: '14 Months',
    seoDescription: 'Case study on building resilient health data systems for rural Ghana.',
    tags: ['Distributed Systems', 'HealthTech', 'Africa']
  }
];
