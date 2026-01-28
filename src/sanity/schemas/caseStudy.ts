export const caseStudy = {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [{ type: 'text' }],
    },
    {
      name: 'client',
      title: 'Client',
      type: 'string',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'problem',
      title: 'Problem',
      type: 'array',
      of: [{ type: 'text' }],
    },
    {
      name: 'background',
      title: 'Background',
      type: 'array',
      of: [{ type: 'text' }],
    },
    {
      name: 'methodology',
      title: 'Methodology',
      type: 'array',
      of: [{ type: 'text' }],
    },
    {
      name: 'investigation',
      title: 'Investigation',
      type: 'array',
      of: [{ type: 'text' }],
    },
    {
      name: 'findings',
      title: 'Findings',
      type: 'array',
      of: [{ type: 'text' }],
    },
    {
      name: 'solution',
      title: 'Solution',
      type: 'array',
      of: [{ type: 'text' }],
    },
    {
      name: 'implementation',
      title: 'Implementation',
      type: 'array',
      of: [{ type: 'text' }],
    },
    {
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [{ type: 'text' }],
    },
    {
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'value', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'Video', value: 'video' },
                ],
              },
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              hidden: ({ parent }: any) => parent?.type !== 'image',
            },
            {
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              hidden: ({ parent }: any) => parent?.type !== 'video',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'conclusion',
      title: 'Conclusion',
      type: 'array',
      of: [{ type: 'text' }],
    },
    {
      name: 'references',
      title: 'References',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'author', type: 'string' },
            { name: 'link', type: 'url' },
            { name: 'year', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'appendix',
      title: 'Appendix',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};
