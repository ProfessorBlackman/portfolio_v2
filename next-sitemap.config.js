const { createClient, groq} = require('next-sanity');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-26',
  useCdn: false,
});

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://methuselah.site',
  generateRobotsTxt: true,
  exclude: [],
  additionalPaths: async (config) => {
    const result = [];

    // Fetch Articles
    const articles = await client.fetch(groq`*[_type == "post" || _type == "article"] | order(publishedAt desc, date desc) {
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
    articles.forEach((article) => {
      if (article.slug) {
        result.push({
          loc: `/articles/${article.slug}`,
          changefreq: 'daily',
          priority: 0.7,
          lastmod: new Date().toISOString(),
        });
      }
    });

    // Fetch Case Studies
    const caseStudies = await client.fetch(groq`*[_type == "caseStudy"] | order(date desc) {
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
    caseStudies.forEach((cs) => {
      if (cs.slug) {
        result.push({
          loc: `/case-studies/${cs.slug}`,
          changefreq: 'daily',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        });
      }
    });

    // Fetch Projects
    const projects = await client.fetch(groq`*[_type == "project"] {
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
    projects.forEach((project) => {
      const slug = project.slug || project._id;
      if (slug) {
        result.push({
          loc: `/projects/${slug}`,
          changefreq: 'daily',
          priority: 0.6,
          lastmod: new Date().toISOString(),
        });
      }
    });

    return result;
  },
  robotsTxtOptions: {
    additionalSitemaps: [],
  },
}