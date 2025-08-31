import { TNextPage } from "@/shared/types/t-next-page";
import * as Sections from "./_page-resources";
import { Metadata } from "next";
import getLanguage from "@/shared/utils/get-language";

export const generateMetadata = async (props: TNextPage): Promise<Metadata> => {
  const lang = await getLanguage(props.params);

  let description = "";

  if (lang === "en-US") description = "Naim Codeseda is a software engineer and designer based in Spain.";
  else description = "Naim Codeseda es un ingeniero de software y diseñador basado en España.";

  return { title: "Naim Codeseda", description };
};

export default function Home(props: TNextPage) {
  return (
    <main className="overflow-x-hidden">
      <Sections.Introduction params={props.params} />
      <Sections.AboutMe params={props.params} />
      <Sections.Projects params={props.params} />
      <Sections.Productions params={props.params} />
      <Sections.Contact params={props.params} />
      <Sections.Footer params={props.params} />
    </main>
  );
}
