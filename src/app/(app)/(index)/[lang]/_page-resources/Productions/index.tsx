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
      "I work with trusted production companies to design performances tailored to different audiences, formats, and venues, always aiming for results that connect and make an impact.",
    "es-ES":
      "Trabajo con compañías de producción de confianza para diseñar actuaciones adaptadas a diferentes audiencias, formatos y espacios, siempre con el objetivo de obtener resultados que conecten y tengan impacto.",
  },

  subDescription: {
    "en-US": "If you’re looking for a choreographer or artist for your next event, show, or creative project, get in touch. I’d be happy to help bring your idea to life.",
    "es-ES": "Si estás buscando un coreógrafo o artista para tu próximo evento, espectáculo o proyecto creativo, contacta conmigo. Me encantaría ayudarte a dar vida a tu idea.",
  },
};

const ProductionsVideosServer = async () => {
  const payload = await getPayload({ config: config });

  const { docs } = await payload.find({ collection: "productions", limit: 100, depth: 1 });

  return <ProductionsVideosClient productions={docs} />;
};
