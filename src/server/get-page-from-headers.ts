import { headers } from "next/headers";

export default async function getPageFromHeaders() {
  const headersList = await headers();
  const page = headersList.get("x-page") || "";

  return page;
}
