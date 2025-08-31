import type { CollectionConfig } from "payload";

export const CV: CollectionConfig = {
  slug: "cv",
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "CV Title",
      defaultValue: "CV",
    },
    {
      name: "language",
      type: "select",
      required: true,
      options: [
        { label: "English", value: "en-US" },
        { label: "Spanish", value: "es-ES" },
      ],
      defaultValue: "en-US",
    },
  ],
  upload: {
    mimeTypes: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "language", "isActive", "updatedAt"],
  },
};
