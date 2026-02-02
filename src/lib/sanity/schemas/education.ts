import { defineField, defineType } from 'sanity'

export const education = defineType({
    name: 'education',
    title: 'Education & Certification',
    type: 'document',
    fields: [
        defineField({
            name: 'institution',
            title: 'Institution / Provider',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'degree',
            title: 'Degree / Certificate Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'fieldOfStudy',
            title: 'Field of Study',
            type: 'string',
        }),
        defineField({
            name: 'startDate',
            title: 'Start Date',
            type: 'date',
        }),
        defineField({
            name: 'endDate',
            title: 'End Date',
            type: 'date',
        }),
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Education', value: 'education' },
                    { title: 'Certification', value: 'certification' },
                ],
            },
            initialValue: 'education',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        })
    ],
})