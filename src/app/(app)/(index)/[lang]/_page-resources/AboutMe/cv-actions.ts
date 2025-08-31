"use server";

import { getPayload } from "payload";
import config from "@/payload.config";
import { safeExecute } from "@/shared/types/safe-execute";
import getPageFromHeaders from "@/server/get-page-from-headers";

export const getActiveCV = safeExecute({
  defaultError: {
    status: "error",
    message: "Error getting active CV",
    client: { toast: { title: "ERROR GETTING ACTIVE CV", description: "Try again later", stylization: "error" } },
  },

  fn: async () => {
    const payload = await getPayload({ config });
    const language = await getPageFromHeaders();

    if (!language || !["en-US", "es-ES"].includes(language)) return { status: "error", message: "No language found" };

    const cv = await payload.find({
      where: { and: [{ language: { equals: language } }] },
      collection: "cv",
      limit: 1,
    });

    const cvDoc = cv.docs[0];

    if (!cvDoc) return { status: "error", message: "No CV found", client: { toast: { title: "ERROR GETTING ACTIVE CV", description: "CV not found", stylization: "error" } } };

    console.log("cvDoc", cvDoc);

    return { status: "success", data: null, client: { download: cvDoc.url || undefined } };
  },
});
