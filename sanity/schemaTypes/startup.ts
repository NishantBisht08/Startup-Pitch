import { Lightbulb } from "lucide-react";
import { defineField, defineType } from "sanity";

export const startup = defineType({
  name: "startup",
  title: "Startup",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    // a slug is basically just like id but it is a string or a name which is unique to it
    defineField({ name: "author", type: "reference", to: { type: "author" } }),
    defineField({ name: "views", type: "number" }),
    defineField({ name: "description", type: "text" }),
    defineField({
      name: "category",
      type: "string",
      validation: (Rule) =>
        Rule.min(1).max(20).required().error("Please enter a category"),
    }),
    defineField({
      name: "image",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "pitch", type: "markdown" }),
  ],
});
