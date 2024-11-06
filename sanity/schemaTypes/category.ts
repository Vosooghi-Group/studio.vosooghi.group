import { Rule } from "sanity";

export const category = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Category name is required"),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule: Rule) =>
        Rule.max(200).error("Max 200 characters for category description"),
    },
  ],
};