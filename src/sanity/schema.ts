import { project } from './schemas/project';
import { article } from './schemas/article';
import { caseStudy } from './schemas/caseStudy';
import { experience } from './schemas/experience';
import { skill } from './schemas/skill';

export const schema = {
  types: [project, article, caseStudy, experience, skill],
};
