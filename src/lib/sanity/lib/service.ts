import { client } from './client';
import { Project, Article, CaseStudy, Experience, Skill, Profile, Education } from '@/lib/types';
import { groq } from 'next-sanity';

export class SanityService {
  async getProjects(): Promise<Project[]> {
    return client.fetch(groq`*[_type == "project"] {
      _id,
      "id": _id,
      title,
      description,
      fullDescription,
      "image": image.asset->url,
      tags,
      githubUrl,
      githubLink,
      liveUrl,
      liveLink,
      features,
      techStack,
      technologies,
      "status": status,
      "statusOld": status,
      architecture,
      category,
      media[] {
        type,
        "url": select(
          type == "image" => image.asset->url,
          type == "video" => videoUrl
        ),
        caption
      }
    }`);
  }

  async getProjectBySlug(slug: string): Promise<Project> {
    return client.fetch(groq`*[_type == "project" && (id == $slug || _id == $slug)][0] {
      _id,
      "id": _id,
      title,
      description,
      fullDescription,
      "image": image.asset->url,
      tags,
      githubUrl,
      githubLink,
      liveUrl,
      liveLink,
      features,
      techStack,
      technologies,
      "status": status,
      "statusOld": status,
      architecture,
      category,
      media[] {
        type,
        "url": select(
          type == "image" => image.asset->url,
          type == "video" => videoUrl
        ),
        caption
      }
    }`, { slug });
  }

  async getArticles(): Promise<Article[]> {
    return client.fetch(groq`*[_type == "post" || _type == "article"] | order(publishedAt desc, date desc) {
      _id,
      "id": _id,
      title,
      "slug": slug.current,
      publishedAt,
      "image": image.asset->url,
      date,
      excerpt,
      body,
      "content": coalesce(content, body),
      tags,
      category,
      duration,
      references
    }`);
  }

  async getArticleBySlug(slug: string): Promise<Article> {
    return client.fetch(groq`*[(_type == "post" || _type == "article") && slug.current == $slug][0] {
      _id,
      "id": _id,
      title,
      "slug": slug.current,
      publishedAt,
      "image": image.asset->url,
      date,
      excerpt,
      body,
      "content": coalesce(content, body),
      tags,
      category,
      duration,
      references
    }`, { slug });
  }

  async getCaseStudies(): Promise<CaseStudy[]> {
    return client.fetch(groq`*[_type == "caseStudy"] | order(date desc) {
      _id,
      title,
      subtitle,
      "slug": slug.current,
      overview,
      client,
      author,
      date,
      "coverImage": coverImage.asset->url,
      problem,
      background,
      methodology,
      investigation,
      findings,
      solution,
      implementation,
      results,
      metrics,
      media[] {
        type,
        "url": select(
          type == "image" => image.asset->url,
          type == "video" => videoUrl
        ),
        caption
      },
      conclusion,
      references,
      appendix,
      duration,
      seoDescription,
      tags
    }`);
  }

  async getCaseStudyBySlug(slug: string): Promise<CaseStudy> {
    return client.fetch(groq`*[_type == "caseStudy" && slug.current == $slug][0] {
      _id,
      title,
      subtitle,
      "slug": slug.current,
      overview,
      client,
      author,
      date,
      "coverImage": coverImage.asset->url,
      problem,
      background,
      methodology,
      investigation,
      findings,
      solution,
      implementation,
      results,
      metrics,
      media[] {
        type,
        "url": select(
          type == "image" => image.asset->url,
          type == "video" => videoUrl
        ),
        caption
      },
      conclusion,
      references,
      appendix,
      duration,
      seoDescription,
      tags
    }`, { slug });
  }

  async getExperiences(): Promise<Experience[]> {
    return client.fetch(groq`*[_type == "experience"] | order(startDate desc, period desc) {
      _id,
      "id": _id,
      title,
      role,
      company,
      location,
      startDate,
      endDate,
      isCurrent,
      period,
      achievements,
      description
    }`);
  }

  async getSkills(): Promise<Skill[]> {
    return client.fetch(groq`*[_type == "skill"] {
      _id,
      name,
      category,
      proficiency,
      level,
      icon,
      type
    }`);
  }

  async getProfile(): Promise<Profile> {
    return client.fetch(groq`*[_type == "profile"][0] {
      _id,
      name,
      profession,
      headline,
      "image": image.asset->url,
      subtitle,
      shortBio,
      fullBio,
      focusAreas,
      thoughtProcess,
      values,
      cta,
      email,
      phone,
      location,
      socialLinks,
      "resume": resume.asset->url
    }`);
  }

  async getEducation(): Promise<Education[]> {
    return client.fetch(groq`*[_type == "education"] | order(startDate desc) {
      _id,
      institution,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      type,
      description,
      certificateUrl
    }`);
  }
}

export const sanityService = new SanityService();
