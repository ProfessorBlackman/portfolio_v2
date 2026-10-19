import { Project } from '@/lib/types';

// Sanity project _ids shown under "Selected work", in display order.
export const FEATURED_PROJECT_IDS = [
  '9d2902ab-d7b4-4543-82f4-b734e828c36a', // MedVerify
  '75382796-0238-4a4e-98ca-6ed0ce15c014', // Ghicons
  '164c1b5f-6ec3-44a9-9d1b-876b75506a85', // SurveyXchange
  '0fb59f02-8271-47af-bd44-4235db16eaf9', // CSV Table Plugin For Sanity
];
const FEATURED_COUNT = 4;

export const pickFeatured = (projects: Project[]) => {
  const featured = FEATURED_PROJECT_IDS
    .map((id) => projects.find((project) => project._id === id))
    .filter((project): project is Project => Boolean(project));
  // Top up from the remaining projects if any curated id is missing.
  const rest = projects.filter((project) => !featured.includes(project));
  return [...featured, ...rest].slice(0, FEATURED_COUNT);
};

/** Honest, human status labels for the project schema's status values. */
export const projectStatusLabel = (status?: Project['status']) =>
  status === 'Completed' ? 'Shipped' : status === 'In Progress' ? 'In progress' : status === 'Planned' ? 'Planned' : null;
