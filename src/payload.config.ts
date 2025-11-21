// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { s3Storage } from "@payloadcms/storage-s3";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { Media } from "./collections/Media";
import { IntroductionVideo } from "./collections/IntroductionVideo";
import { Users } from "./collections/Users";
import { CV } from "./collections/CV";
import { AboutMe } from "./collections/AboutMe";
import { Projects } from "./collections/Projects";
import { Productions } from "./collections/Productions";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  sharp,
  admin: { user: Users.slug, importMap: { baseDir: path.resolve(dirname) } },
  collections: [Users, Media, IntroductionVideo, CV, AboutMe, Projects, Productions],
  upload: { limits: { fileSize: 1024 * 1024 * 25 } },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL || "" } }),
  plugins: [
    s3Storage({
      collections: { 
        media: { prefix: "media" },
        cv: { prefix: "cv" }
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        forcePathStyle: true,
        credentials: { accessKeyId: process.env.S3_ACCESS_KEY_ID || "", secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "" },
        region: process.env.S3_REGION || "",
        endpoint: process.env.S3_ENDPOINT || "",
      },
    }),
  ],
});
