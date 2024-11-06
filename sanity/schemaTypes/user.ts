import { Rule } from "sanity";
export const user = {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, 
      },
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
  ],
};
