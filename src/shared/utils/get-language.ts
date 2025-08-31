import { notFound } from "next/navigation";
import { TNextParams } from "../types/t-next-page";

export default async function getLanguage(paramsPromise: TNextParams) {
  const params = await paramsPromise;

  const language = params.lang;

  if (!language || !["en-US", "es-ES"].includes(language)) notFound();

  return language as "en-US" | "es-ES";
}
