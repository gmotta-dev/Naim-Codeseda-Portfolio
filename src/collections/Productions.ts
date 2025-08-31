import type { CollectionConfig } from "payload";

export const Productions: CollectionConfig = {
  slug: "productions",
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true, maxLength: 30 },
    { name: "youtubeUrl", type: "text", required: true },
  ],
};
