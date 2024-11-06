import { Rule } from "sanity";

export const showcase = {
  name: "showcase",
  title: "Showcase",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Title is required"),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule: Rule) =>
        Rule.required().error("Description is required"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: Rule) => Rule.required().error("Slug is required"),
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      validation: (Rule: Rule) =>
        Rule.max(300).error("Max 300 characters for excerpt"),
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (Rule: Rule) =>
                Rule.required().error("Alt text is required"),
            },
          ],
        },
      ],
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Feature Name", type: "string" },
            { name: "icon", title: "Icon", type: "string" },
          ],
        },
      ],
      validation: (Rule: Rule) =>
        Rule.required().min(1).error("At least one feature is required"),
    },
    {
      name: "englishName",
      title: "English Name",
      type: "string",
      validation: (Rule: Rule) =>
        Rule.required().error("English name is required"),
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (Rule: Rule) =>
        Rule.required().min(1).error("At least one category is required"),
    },

    {
      name: "instagram",
      title: "Instagram Link",
      type: "url",
      validation: (Rule: Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }).error("Must be a valid URL"),
    },
    {
      name: "website",
      title: "Website Link",
      type: "url",
      validation: (Rule: Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }).error("Must be a valid URL"),
    },
  ],
};
