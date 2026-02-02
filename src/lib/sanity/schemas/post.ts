import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          name: 'csvTable',
          title: 'CSV Table',
          type: 'csvTable',
          description: 'For CSV table data',
        },
        {
          type: "code",
          name: "code",
          title: "Code",
          options: {
            withFilename: true,
            language: "javascript",
            languageAlternatives: [
              { value: "javascript", title: "JavaScript" },
              { value: "python", title: "Python" },
              { value: "java", title: "Java" },
              { value: "dart", title: "Dart" },
              { value: "typescript", title: "TypeScript" },
              { value: "c#", title: "C#" },
              { value: "go", title: "Go" },
              { value: "rust", title: "Rust" },
              { value: "swift", title: "Swift" },
              { value: "kotlin", title: "Kotlin" },
              { value: "scala", title: "Scala" },
              { value: "elixir", title: "Elixir" },
              { value: "erlang", title: "Erlang" },
              { value: "sql", title: "SQL" },
              { value: "html", title: "HTML" },
              { value: "css", title: "CSS" },
              { value: "shell", title: "Shell" },
              { value: "json", title: "JSON" },
              { value: "xml", title: "XML" },
              { value: "yaml", title: "YAML" },
              { value: "markdown", title: "Markdown" },
              { value: "mermaid", title: "Mermaid" },
            ]
          }
        },

        { type: "image" },
      ],
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
    }),
    defineField({
      name: 'duration',
      type: 'string',
      title: 'Duration',
    }),
    defineField({
      name: 'dateCreated',
      type: 'datetime',
      title: 'Date Created',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "references",
      title: "References / Citations",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "author", type: "string", title: "Author" },
            { name: "link", type: "url", title: "Link (optional)" },
            { name: "year", type: "string", title: "Year" },
          ],
        },
      ],
    }),
  ],
})

