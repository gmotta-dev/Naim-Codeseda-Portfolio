import type { CollectionConfig } from "payload";

export const AboutMe: CollectionConfig = {
  slug: "about-me",
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
      name: "profilePicture",
      label: "Profile Picture (Recommended Size: 496x649)",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "aboutMeText",
      type: "richText",
      required: true,
    },
    {
      name: "trainingList",
      type: "array",
      required: true,
      fields: [
        {
          name: "item",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "specialitiesList",
      type: "array",
      required: true,
      fields: [
        {
          name: "item",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
