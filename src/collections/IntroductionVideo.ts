import type { CollectionConfig } from "payload";

export const IntroductionVideo: CollectionConfig = {
  slug: "introduction-video",
  access: { read: () => true },
  fields: [
    {
      name: "youtubeUrl",
      type: "text",
      label: "YouTube Video URL",
      admin: { description: "Enter the full YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)" },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (!value) return value;

            // Extract video ID from various YouTube URL formats
            const patterns = [/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/, /youtube\.com\/v\/([^&\n?#]+)/];

            for (const pattern of patterns) {
              const match = value.match(pattern);
              if (match) return `https://www.youtube.com/embed/${match[1]}`;
            }

            // If it's already an embed URL, return as is
            if (value.includes("youtube.com/embed/")) return value;

            return value;
          },
        ],
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      label: "Active",
      defaultValue: true,
      admin: { description: "Only active content will be displayed on the website" },
    },
  ],
};
