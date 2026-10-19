import { project } from './schemas/project';
import { post } from './schemas/post';
import { caseStudy } from './schemas/caseStudy';
import { experience } from './schemas/experience';
import { skill } from './schemas/skill';
import { profile } from './schemas/profile';
import { education } from './schemas/education';
import { labItem } from './schemas/labItem';

export const schema = {
  types: [project, post, caseStudy, experience, skill, profile, education, labItem],
};
