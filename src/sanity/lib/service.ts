import { client } from './client';
import { Project, Article, CaseStudy, Experience, Skill } from '@/types';
import { groq } from 'next-sanity';

export class SanityService {
  async getProjects(): Promise<Project[]> {
    return client.fetch(groq`*[_type == "project"] {
      "id": _id,
      title,
      description,
      fullDescription,
      status,
      tags,
      "image": image.asset->url,
      category,
      githubLink,
      liveLink,
      technologies,
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
      "id": _id,
      title,
      description,
      fullDescription,
      status,
      tags,
      "image": image.asset->url,
      category,
      githubLink,
      liveLink,
      technologies,
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
    return client.fetch(groq`*[_type == "article"] | order(date desc) {
      "id": _id,
      title,
      "slug": slug.current,
      date,
      excerpt,
      content,
      tags,
      category
    }`);
  }

  async getArticleBySlug(slug: string): Promise<Article> {
    return client.fetch(groq`*[_type == "article" && slug.current == $slug][0] {
      "id": _id,
      title,
      "slug": slug.current,
      date,
      excerpt,
      content,
      tags,
      category
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
    return client.fetch(groq`*[_type == "experience"] | order(period desc) {
      "id": _id,
      role,
      company,
      period,
      description
    }`);
  }

  async getSkills(): Promise<Skill[]> {
    return client.fetch(groq`*[_type == "skill"] {
      name,
      level,
      type
    }`);
  }
}

export const sanityService = new SanityService();
