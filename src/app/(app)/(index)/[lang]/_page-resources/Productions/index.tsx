import ContentWrapper from "@/shared/components/ContentWrapper";
import { TNextParams } from "@/shared/types/t-next-page";
import getLanguage from "@/shared/utils/get-language";
import { getPayload } from "payload";
import config from "@payload-config";
import ProductionsVideosClient from "./ProductionsVideos/ProductionsVideosClient";
import { StaggeredFade } from "@/shared/components/StaggeredFade";
import { Suspense } from "react";
import * as motion from "motion/react-client";

export default function Productions(props: { params: TNextParams }) {
  return (
    <section id="productions" className="overflow-hidden">
      <ContentWrapper element="div" className="mt-32 flex flex-col items-start justify-between gap-x-12 lg:grid">
        <Suspense fallback={<div className="h-[750px] w-full lg:h-[685px]" />}>
          <Header params={props.params} />
          <ProductionsVideosServer />
        </Suspense>
      </ContentWrapper>
    </section>
  );
}

const Header = async (props: { params: TNextParams }) => {
  const currentLang = await getLanguage(props.params);

  return (
    <header className="relative max-w-[580px] 2xl:max-w-[497px] 2xl:self-start 2xl:justify-self-start">
      <motion.span
        initial={{ opacity: 0, height: 0 }}
        whileInView={{ opacity: 1, height: "100%" }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="absolute top-0 -left-8 w-[1px] bg-neutral-300"
      />
      <StaggeredFade element="h3" duration={0.1} text={texts.productions[currentLang]} className="text-5xl font-extralight text-neutral-900 lg:text-7xl" />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-6 text-sm font-extralight text-neutral-800 lg:text-base"
      >
        {texts.description[currentLang]}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        viewport={{ once: true }}
        className="mt-4 text-sm font-extralight text-neutral-800 lg:text-base"
      >
        {texts.subDescription[currentLang]}
      </motion.p>
    </header>
  );
};

const texts = {
  productions: { "en-US": "Productions", "es-ES": "Producciones" },

  description: {
    "en-US":
      "As a choreographer and artistic director, I collaborate with talents from around the world to transform ideas into unforgettable shows.",
    "es-ES":
      "Como coreógrafo y director artístico, colaboro con talentos de todo el mundo para transformar ideas en espectáculos inolvidables.",
  },

  subDescription: {
    "en-US": "In this section, you will find a selection of projects from some of my closest collaborators, with whom I work to bring the best performances and experiences to the audience.",
    "es-ES": "En esta sección encontrarás una muestra de los proyectos de algunos de mis colaboradores más cercanos, con quienes trabajo para llevar al público los mejores espectáculos y experiencias.",
  },
};

const ProductionsVideosServer = async () => {
  const payload = await getPayload({ config: config });

  const { docs } = await payload.find({ collection: "productions", limit: 100, depth: 1 });

  return <ProductionsVideosClient productions={docs} />;
};
