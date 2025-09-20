import Clickables from "@/shared/components/Clickables";
import ContentWrapper from "@/shared/components/ContentWrapper";
import { Suspense } from "react";
import Skeleton from "@/shared/components/Skeleton";
import getLanguage from "@/shared/utils/get-language";
import payload from "@/lib/payload-client";
import ErrorBoundary from "@/shared/components/ErrorBoundary";
import Placeholder from "@/shared/components/Placeholder";
import Icons from "@/shared/components/icons";
import { StaggeredFade } from "@/shared/components/StaggeredFade";
import * as motion from "motion/react-client";

export default async function Introduction(props: { params: Promise<Record<string, string>> }) {
  return (
    <section id="home" className="relative overflow-hidden lg:h-[884px]">
      <ContentWrapper element="div" className="mt-16 flex flex-col lg:mt-48 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <Header params={props.params} />
        <YTVideo />
      </ContentWrapper>
    </section>
  );
}

const Header = async (props: { params: Promise<Record<string, string>> }) => {
  const lang = await getLanguage(props.params);
  const { title, description, button, buttonSecondary } = languages[lang];

  return (
    <header className="w-full max-w-[452px]">
      <span className="mb-2 flex items-center gap-4 text-xs">
        <motion.hr initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="h-[.5px] w-14 border-none bg-neutral-400" />
        <StaggeredFade element="span" text={title} className="font-light tracking-widest text-neutral-500" />
      </span>
      <StaggeredFade element="h1" text="Naim Codeseda" className="text-5xl font-extralight md:text-8xl" />
      <StaggeredFade element="p" text={description} className="mt-4 font-light text-neutral-700 md:text-lg" duration={0.02} />
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 2.5 }} className="mt-8 flex gap-4">
        <Clickables.Link href={`/${lang}#projects`}>{button}</Clickables.Link>
        <Clickables.Link href={`/${lang}#contact`} stylization="secondary">
          {buttonSecondary}
        </Clickables.Link>
      </motion.div>
    </header>
  );
};

const YTVideo = async () => {
  const SuspensedEl = async () => {
    const videoContent = (await payload.find({ collection: "introduction-video" })).docs[0];

    if (!videoContent || !videoContent.youtubeUrl) throw new Error("Video content not found");

    return (
      <motion.iframe
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        allowFullScreen
        title="Introduction Video"
        className="h-full w-full overflow-hidden rounded-md"
        src={videoContent.youtubeUrl + "?autoplay=1&mute=1&controls=0"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    );
  };

  return (
    <div className="mt-6 flex aspect-video w-full items-center justify-center lg:mt-0 lg:h-[393px] lg:max-w-[700px]">
      <Suspense>
        <ErrorBoundary fallbackComponent={<Placeholder title="Video not found" icon={Icons.Carbon.Video} stylization={{ variant: "transparent" }} />}>
          <SuspensedEl />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};

const languages = {
  "en-US": {
    title: "HELLO, I'M",
    description: "Performing artist with experience as a dancer, martial artist, choreographer, and stage performer.",
    button: "VIEW PROJECTS",
    buttonSecondary: "GET IN TOUCH",
  },
  "es-ES": {
    title: "HOLA, SOY",
    description: "Bailarín · Artista Marcial · Creador Escénico",
    button: "VER TRABAJO",
    buttonSecondary: "CONTACTAR",
  },
};
