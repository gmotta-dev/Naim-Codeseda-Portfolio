"use client";

import { Production } from "@/payload-types";
import Icons from "@/shared/components/icons";
import getYTVideoID from "@/shared/utils/get-yt-video-id";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Fragment, useState, useEffect } from "react";

import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

export default function ProductionsVideosClient(props: { productions: Production[] }) {
  const [selectedVideo, setSelectedVideo] = useState<Production>(props.productions[0]);

  return (
    <Fragment>
      <SelectedVideo production={selectedVideo} />
      <VideosCarousel productions={props.productions} setSelectedProduction={setSelectedVideo} />
    </Fragment>
  );
}

// ... existing code ...

const SelectedVideo = (prod: { production: Production }) => {
  const videoId = getYTVideoID(prod.production.youtubeUrl);

  return (
    <div
      className="mt-12 flex w-full max-w-[650px] flex-col lg:min-w-[500px] xl:w-[650px] 2xl:col-start-2 2xl:col-end-3 2xl:mt-0 2xl:place-self-end 2xl:self-end"
      key={prod.production.id}
    >
      <motion.iframe
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        viewport={{ once: true }}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={`aspect-video h-full w-full overflow-hidden rounded-md`}
      />

      <motion.p
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        viewport={{ once: true }}
        className="mt-4 ml-auto text-3xl font-light text-neutral-800"
      >
        {prod.production.title}
      </motion.p>
    </div>
  );
};

// ... existing code ...

const VideosCarousel = (props: { productions: Production[]; setSelectedProduction: (production: Production) => void }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "x",
    startIndex: 0,
    containScroll: "trimSnaps",
    align: "start",
    slidesToScroll: 1,
    dragFree: false,
    skipSnaps: false,
    watchDrag: true,
    watchResize: true,
  });

  // Ensure carousel is properly initialized
  useEffect(() => {
    if (emblaApi) {
      const timer = setTimeout(() => emblaApi.reInit(), 100);

      return () => clearTimeout(timer);
    }
  }, [emblaApi]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      viewport={{ once: true }}
      className="relative col-start-1 col-end-3 mt-14 grid xl:flex"
    >
      <CaretButton
        onClick={() => (emblaApi ? emblaApi.scrollPrev() : null)}
        disabled={emblaApi?.slidesInView()?.includes(0)}
        className="col-start-1 col-end-2 row-start-2 xl:-left-12"
        Icon={Icons.Carbon.CaretLeft}
      />

      <div ref={emblaRef} className="col-start-1 col-end-4 row-start-1 flex overflow-hidden">
        <div className="flex">
          {props.productions.map((production, key) => {
            const isYT = production.youtubeUrl.includes("youtube");
            const videoId = getYTVideoID(production.youtubeUrl);

            const imageSrc = isYT ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";

            return (
              <div
                key={key}
                className={`group w-full flex-shrink-0 cursor-pointer !pr-0 sm:max-w-[313px] sm:px-2 ${key !== 0 ? "!pl-4" : ""} ${key === props.productions.length - 1 ? "!pr-0" : ""}`}
                onClick={() => props.setSelectedProduction(production)}
              >
                <div className="w-full">
                  <div className="relative overflow-hidden rounded-md">
                    <Image src={imageSrc} alt={production.title} width={288} height={120} className="w-full object-cover" />
                    <div className="z-10[100] absolute inset-0 flex h-full w-full items-center justify-center bg-neutral-950 opacity-50 transition-all duration-300 group-hover:opacity-40" />
                    <Icons.Carbon.Play className="absolute top-1/2 left-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-white transition-all duration-300 group-hover:scale-110" />
                  </div>
                  <p className="mt-4 font-extralight text-neutral-800 group-hover:text-neutral-900">{production.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CaretButton
        onClick={() => (emblaApi ? emblaApi.scrollNext() : null)}
        disabled={emblaApi?.slidesInView()?.includes(props.productions.length - 1)}
        className="col-start-3 col-end-4 row-start-2 xl:-right-12"
        Icon={Icons.Carbon.CaretRight}
      />
    </motion.div>
  );
};

const CaretButton = (props: {
  onClick: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  disabled: boolean | undefined;
  className: string;
  Icon: React.ElementType;
}) => {
  return (
    <button
      onClick={props.onClick}
      onKeyDown={props.onKeyDown}
      className={twMerge("cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 xl:absolute xl:top-[45%] xl:-translate-y-1/2", props.className)}
    >
      <props.Icon className="h-14 w-14 text-neutral-800 hover:text-neutral-700" />
    </button>
  );
};
