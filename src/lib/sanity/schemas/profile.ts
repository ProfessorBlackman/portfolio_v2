import { defineField, defineType } from 'sanity'

export const profile = defineType({
    name: 'profile',
    title: 'Profile',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'profession',
            title: 'Profession',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'headline',
            title: 'Headline',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Profile Image',
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
            name: 'subtitle',
            title: 'Subtitle',
            type: 'text',
            rows: 3,
            description: 'Used in the Hero section',
        }),
        defineField({
            name: 'shortBio',
            title: 'Short Bio',
            type: 'text',
            rows: 3,
            description: 'Used in the Hero section',
        }),
        defineField({
            name: 'fullBio',
            type: 'array',
            title: 'Detailed Bio',
            description: 'Used in the About section',
            of: [{type: 'block'}]
        }),
        defineField({
            name: 'focusAreas',
            type: 'array',
            title: 'Focus Areas',
            description: 'Used in the About section',
            of: [{type: 'block'}]
        }),
        defineField({
            name: 'thoughtProcess',
            type: 'array',
            title: 'Thought Process',
            description: 'Used in the About section',
            of: [{type: 'block'}]
        }),
        defineField({
            name: 'values',
            title: 'Values',
            type: 'text',
            rows: 3,
            description: 'Used in the Hero section',
        }),
        defineField({
            name: 'cta',
            type: 'array',
            title: 'Call to Action',
            description: 'Used in the About section',
            of: [{type: 'block'}]
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'object',
            fields: [
                { name: 'github', type: 'url', title: 'GitHub URL' },
                { name: 'linkedin', type: 'url', title: 'LinkedIn URL' },
                { name: 'twitter', type: 'url', title: 'Twitter/X URL' },
            ]
        }),
        defineField({
            name: 'resume',
            title: 'Resume/CV',
            type: 'file',
        }),
    ],
})