import { defineField, defineType } from 'sanity'

export const labItem = defineType({
    name: 'labItem',
    title: 'Lab Item',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'Shown as the folder name in the lab listing, e.g. "tiny-tools".',
            options: { source: 'title', maxLength: 64 },
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            description: 'Be honest — unfinished is fine.',
            options: {
                list: [
                    { title: 'Exploring', value: 'exploring' },
                    { title: 'Prototype', value: 'prototype' },
                    { title: 'Shipped', value: 'shipped' },
                    { title: 'Paused', value: 'paused' },
                    { title: 'Abandoned', value: 'abandoned' },
                ],
                layout: 'radio',
            },
            initialValue: 'exploring',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'summary',
            title: 'Summary',
            type: 'text',
            rows: 3,
            description: 'One or two sentences: what it is and what you are learning.',
            validation: (Rule) => Rule.max(280),
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'link',
            title: 'Demo / write-up link',
            type: 'url',
        }),
        defineField({
            name: 'repo',
            title: 'Repository link',
            type: 'url',
        }),
        defineField({
            name: 'date',
            title: 'Started',
            type: 'date',
        }),
    ],
    preview: {
        select: { title: 'title', subtitle: 'status' },
    },
})
