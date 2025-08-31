import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */

  images: { remotePatterns: [{ protocol: "https", hostname: "img.youtube.com" }] },
};

export default withPayload(nextConfig);
