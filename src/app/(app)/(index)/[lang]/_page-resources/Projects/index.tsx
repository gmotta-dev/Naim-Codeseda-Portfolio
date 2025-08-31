import React, { Suspense } from "react";
import ContentWrapper from "@/shared/components/ContentWrapper";
import ProjectsClient from "./ProjectsClient";
import { getPayload } from "payload";
import config from "@payload-config";
import getLanguage from "@/shared/utils/get-language";
import { TNextParams } from "@/shared/types/t-next-page";
import ErrorBoundary from "@/shared/components/ErrorBoundary";
import Skeleton from "@/shared/components/Skeleton";
import Placeholder from "@/shared/components/Placeholder";
import Icons from "@/shared/components/icons";
import type { Project } from "@/payload-types";
import { TLanguage } from "@/shared/types/tlang";
import { StaggeredFade } from "@/shared/components/StaggeredFade";
import * as motion from "motion/react-client";

export default async function Projects(props: { params: TNextParams }) {
  const SuspensedEl = async () => {
    const currentLang = await getLanguage(props.params);

    const payload = await getPayload({ config: config });
    const { docs } = await payload.find({
      collection: "projects",
      limit: 100,
      depth: 1,
      where: { language: { equals: currentLang } },
      sort: "-projectDate",
    });

    if (!docs || docs.length === 0) {
      throw new Error("No projects found");
    }

    return (
      <section id="projects" className="relative flex overflow-hidden bg-gray-100 pt-16 lg:pt-32">
        <ContentWrapper element="div" className="relative flex h-full flex-col justify-center">
          <Header currentLang={currentLang} />
          <ProjectsClient projects={docs as Project[]} />
        </ContentWrapper>
      </section>
    );
  };

  return (
    <ErrorBoundary fallbackComponent={<Placeholder title="Projects not found" icon={Icons.Carbon.Video} stylization={{ variant: "transparent" }} />}>
      <Suspense fallback={<Skeleton className="min-h-[854px] lg:min-h-[654px] w-full" />}>
        <SuspensedEl />
      </Suspense>
    </ErrorBoundary>
  );
}

const Header = async (props: { currentLang: TLanguage }) => {
  return (
    <div className="mb-16">
      <span className="mb-2 flex items-center gap-4 text-xs">
        <motion.hr
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="h-[.5px] w-14 border-none bg-neutral-400"
        />
        <StaggeredFade element="span" text={texts.smallTitle[props.currentLang]} className="font-light tracking-widest text-neutral-500" />
      </span>

      <StaggeredFade element="h2" text={texts.title[props.currentLang]} className="text-6xl font-extralight text-neutral-800 lg:text-8xl" />
    </div>
  );
};

const texts = {
  smallTitle: { ["en-US"]: "SELECTED WORKS", ["es-ES"]: "TRABAJOS SELECCIONADOS" },
  title: { ["en-US"]: "PROJECTS", ["es-ES"]: "PROYECTOS" },
};
