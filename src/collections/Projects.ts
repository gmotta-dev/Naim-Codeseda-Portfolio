import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "language",
      type: "select",
      required: true,
      options: [
        { label: "English", value: "en-US" },
        { label: "Spanish", value: "es-ES" },
      ],
    },
    {
      name: "category",
      type: "text",
      required: true,
    },
    {
      name: "projectDate",
      type: "date",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
      maxLength: 30,
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "images",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "youtubeVideos",
      type: "array",
        fields: [{ name: "url", type: "text", required: true }],
    },
  ],
};
