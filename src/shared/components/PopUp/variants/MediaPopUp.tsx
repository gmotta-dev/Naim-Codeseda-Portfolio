"use client";

import { Fragment, use } from "react";
import { popUpCTX } from "../PopUpCTX";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import Icons from "../../icons";
import getYTVideoID from "@/shared/utils/get-yt-video-id";

export default function MediaPopUp(props: {
  media: string;
  alt: string;
  sizes: { closed: { width: number; height: number }; open: { width: number; height: number } };
  classNames?: Partial<Record<"container" | "image", string>>;
}) {
  const popUpStates = use(popUpCTX);

  const isYT = props.media.includes("youtube");
  const videoId = getYTVideoID(props.media);

  const imageSrc = isYT ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : props.media;

  const media = isYT ? `https://www.youtube.com/embed/${videoId}` : props.media;

  return (
    <div
      className={twMerge("relative cursor-pointer", props.classNames?.container)}
      onClick={() => popUpStates.setPopUpContent(<PopUpContent media={media} alt={props.alt} sizes={props.sizes} />)}
    >
      <Image src={imageSrc} alt={props.alt} width={props.sizes.closed.width} height={props.sizes.closed.height} className={twMerge("h-full w-full object-cover", props.classNames?.image)} />

      {isYT && (
        <Fragment>
          <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-neutral-950 opacity-70" />
          <Icons.Carbon.Play className="absolute top-1/2 left-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-white" />
        </Fragment>
      )}
    </div>
  );
}

const PopUpContent = (props: { media: string; alt: string; sizes: { closed: { width: number; height: number }; open: { width: number; height: number } } }) => {
  const Element = (rest: any) =>
    props.media.includes("youtube") ? (
      <iframe
        {...rest}
        title="Media"
        allowFullScreen
        src={props.media + "?autoplay=1&mute=1"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className="aspect-video h-[500px] w-full max-w-[890px]"
      />
    ) : (
      <Image {...rest} quality={100} src={props.media} alt={props.alt} width={props.sizes.open.width} height={props.sizes.open.height} className={twMerge("max-w-[350px] md:max-w-none", rest.className)} />
    );

  return <Element />;
};
