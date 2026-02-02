import { defineField, defineType } from 'sanity'

export const project = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'id',
            title: 'ID',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'fullDescription',
            title: 'Full Description',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Project Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'githubUrl',
            title: 'GitHub URL',
            type: 'url',
        }),
        defineField({
            name: 'githubLink',
            title: 'GitHub Link',
            type: 'url',
        }),
        defineField({
            name: 'liveUrl',
            title: 'Live URL',
            type: 'url',
        }),
        defineField({
            name: 'liveLink',
            title: 'Live Link',
            type: 'url',
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'techStack',
            title: 'Tech Stack',
            type: 'object',
            fields: [
                {
                    name: 'frontend',
                    title: 'Frontend',
                    type: 'array',
                    of: [{ type: 'string' }]
                },
                {
                    name: 'backend',
                    title: 'Backend',
                    type: 'array',
                    of: [{ type: 'string' }]
                },
                {
                    name: 'database',
                    title: 'Database',
                    type: 'array',
                    of: [{ type: 'string' }]
                },
                {
                    name: 'others',
                    title: 'Others',
                    type: 'array',
                    of: [{ type: 'string' }]
                },
            ]
        }),
        defineField({
            name: 'technologies',
            title: 'Technologies',
            type: 'array',
            of: [{type: 'string'}],
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Completed', value: 'Completed' },
                    { title: 'In Progress', value: 'In Progress' },
                    { title: 'Planned', value: 'Planned' },
                ],
            },
            initialValue: 'Completed',
        }),
        defineField({
            name: 'architecture',
            title: 'Architecture Description',
            type: 'text',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
        }),
        defineField({
            name: 'media',
            title: 'Media',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'projectMedia',
                    fields: [
                        {
                            name: 'type',
                            title: 'Type',
                            type: 'string',
                            options: {
                                list: [
                                    {title: 'Image', value: 'image'},
                                    {title: 'Video', value: 'video'},
                                ],
                            },
                        },
                        {
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            hidden: ({parent}: any) => parent?.type !== 'image',
                        },
                        {
                            name: 'videoUrl',
                            title: 'Video URL',
                            type: 'url',
                            hidden: ({parent}: any) => parent?.type !== 'video',
                        },
                        {
                            name: 'caption',
                            title: 'Caption',
                            type: 'string',
                        },
                    ],
                },
            ],
        }),
    ],
})
