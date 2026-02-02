import { defineField, defineType } from 'sanity'

export const skill = defineType({
    name: 'skill',
    title: 'Skill',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Skill Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Languages', value: 'languages' },
                    { title: 'Frameworks', value: 'frameworks' },
                    { title: 'Databases', value: 'databases' },
                    { title: 'Cloud & DevOps', value: 'cloud' },
                    { title: 'CI/CD', value: 'cicd' },
                    { title: 'Monitoring', value: 'monitoring' },
                    { title: 'Development Tools', value: 'tools' },
                    { title: 'Backend', value: 'backend' },
                    { title: 'Security', value: 'security' },
                    { title: 'Interests', value: 'interests' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'proficiency',
            title: 'Proficiency (%)',
            type: 'number',
            validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
            name: 'level',
            title: 'Level',
            type: 'number',
            validation: (Rule: any) => Rule.min(0).max(100),
        }),
        defineField({
            name: 'icon',
            title: 'Icon Name (Lucide)',
            type: 'string',
            description: 'Name of the Lucide icon to use (optional, mostly for category representation if needed)',
        }),
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
        }),
    ],
})
