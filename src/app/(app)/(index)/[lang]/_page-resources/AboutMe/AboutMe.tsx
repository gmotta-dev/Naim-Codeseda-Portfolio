import ContentWrapper from "@/shared/components/ContentWrapper";
import getLanguage from "@/shared/utils/get-language";
import { TNextParams } from "@/shared/types/t-next-page";
import Image from "next/image";
import CVButton from "./CVButton";
import type { AboutMe } from "@/payload-types";
import ErrorBoundary from "@/shared/components/ErrorBoundary";
import Icons from "@/shared/components/icons";
import Skeleton from "@/shared/components/Skeleton";
import Placeholder from "@/shared/components/Placeholder";
import RichTextComponent from "@/shared/components/RichText";
import { Fragment, Suspense } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import * as motion from "motion/react-client";

export default async function AboutMe(props: { params: TNextParams }) {
  const SuspensedEl = async () => {
    const currentLang = await getLanguage(props.params);

    const payload = await getPayload({ config: config });
    const { docs } = await payload.find({ collection: "about-me", limit: 1, depth: 1, where: { language: { equals: currentLang } } });

    const aboutMeData = docs[0];

    if (!aboutMeData || !aboutMeData.profilePicture || typeof aboutMeData.profilePicture === "number") throw new Error("About me not found");

    const picture = aboutMeData.profilePicture;

    return (
      <Fragment>
        <motion.div
          id="about"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto w-full max-w-[300px] flex-1 md:mx-0 md:min-h-[500px] md:w-auto md:max-w-max md:min-w-[300px]"
        >
          <Image src={(picture as any).url} className="h-full w-full object-cover" alt="Naim Codeseda" height={649} width={496} priority />
        </motion.div>
        <Texts params={props.params} aboutMeData={aboutMeData} />
      </Fragment>
    );
  };

  return (
    <section className="bg-neutral-50 py-24 md:min-h-[663px]">
      <ContentWrapper element="div" className="flex flex-col items-start gap-6 overflow-hidden md:flex-row">
        <ErrorBoundary fallbackComponent={<Placeholder title="About me not found" icon={Icons.Carbon.User} stylization={{ variant: "transparent" }} />}>
          <Suspense fallback={<div className="mx-auto w-full max-w-[300px] min-h-[1037px] flex-1 md:mx-0 md:min-h-[649px] md:w-auto md:max-w-[496px] md:min-w-[300px]" />}>
            <SuspensedEl />
          </Suspense>
        </ErrorBoundary>
      </ContentWrapper>
    </section>
  );
}

const Texts = async (props: { params: TNextParams; aboutMeData: AboutMe }) => {
  // Get current language for titles
  const currentLang = await getLanguage(props.params);
  const titles = {
    "en-US": { title: "ABOUT ME", training: "TRAINING", specialties: "SPECIALTIES" },
    "es-ES": { title: "SOBRE MÍ", training: "ENTRENAMIENTO", specialties: "ESPECIALIDADES" },
  };

  return (
    <motion.div
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className="relative mt-6 h-full max-w-[704px] border-t border-r border-neutral-200 pr-12"
    >
      <div className="absolute top-0 left-0 flex w-full -translate-y-1/2 items-center justify-between gap-4 pr-2 lg:pr-10">
        <div className="bg-neutral-50 pr-6">
          <h2 className="text-2xl leading-[0.7] font-extralight md:text-4xl lg:text-[56px]">{titles[currentLang].title}</h2>
        </div>
        <CVButton />
      </div>
      <div className="flex flex-col gap-4 pt-14">
        <RichTextComponent content={props.aboutMeData.aboutMeText} className="text-sm text-neutral-700 lg:text-base" />
      </div>
      <div className="mt-4 flex gap-24">
        <GroupedTexts title={titles[currentLang].training} texts={props.aboutMeData?.trainingList.map((item) => item.item) || []} />
        <GroupedTexts title={titles[currentLang].specialties} texts={props.aboutMeData?.specialitiesList.map((item) => item.item) || []} />
      </div>
    </motion.div>
  );
};

const GroupedTexts = (props: { title: string; texts: string[] }) => {
  return (
    <div>
      <h4 className="font-medium text-gray-900 lg:text-lg">{props.title}</h4>
      {props.texts.map((text, index) => (
        <p className="text-sm font-light text-neutral-500" key={index}>
          {text}
        </p>
      ))}
    </div>
  );
};
