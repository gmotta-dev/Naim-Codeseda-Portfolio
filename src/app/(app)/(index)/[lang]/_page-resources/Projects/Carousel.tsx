import useEmblaCarousel from "embla-carousel-react";
import { Project } from "@/payload-types";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import MediaPopUp from "@/shared/components/PopUp/variants/MediaPopUp";

export default function Carousel(props: { images: Project["images"]; youtubeVideos: Project["youtubeVideos"] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "x",
    loop: true,
    startIndex: 1,
    containScroll: "trimSnaps",
    align: "start",
  });

  const [autoplay, setAutoplay] = useState(true);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to disable autoplay temporarily
  const disableAutoplayTemporarily = () => {
    setAutoplay(false);

    // Clear existing timeout
    if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);

    // Re-enable autoplay after 5 seconds of inactivity
    autoplayTimeoutRef.current = setTimeout(() => setAutoplay(true), 5000);
  };

  useEffect(() => {
    if (!emblaApi || !autoplay) return;

    const autoplayInterval = setInterval(() => {
      if (emblaApi.canScrollNext()) emblaApi.scrollNext();
      else emblaApi.scrollTo(0);
    }, 3000);

    return () => clearInterval(autoplayInterval);
  }, [emblaApi, autoplay]);

  // Add scroll event listeners to detect manual scrolling
  useEffect(() => {
    if (!emblaApi) return;

    const onScroll = () => disableAutoplayTemporarily();

    emblaApi.on("scroll", onScroll);

    return () => {
      emblaApi.off("scroll", onScroll);
    };
  }, [emblaApi]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, []);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  const images = [...props.images, ...(props?.youtubeVideos || []).map((video) => ({ image: { url: video.url } }))];

  return (
    <div className="relative flex h-[320px] lg:h-[470px] w-1/2 items-center">
      <div className="animate-fade-in absolute inset-0 w-[150%]">
        <div ref={emblaRef} className="relative h-full overflow-visible" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="flex h-full">
            {images.map((imageItem, index) => (
              <div key={index} className="mr-4 h-full w-full max-w-[340px] flex-shrink-0">
                <div className="h-[320px] lg:h-[470px] overflow-hidden rounded-lg bg-gradient-to-br from-gray-200 to-gray-300">
                  <MediaPopUp
                    media={(imageItem.image as any).url}
                    alt={(imageItem.image as any).alt || `Project image ${index + 1}`}
                    sizes={{ closed: { width: 340, height: 470 }, open: { width: 500, height: 650 } }}
                    classNames={{ container: "h-[320px] lg:h-[470px] w-full object-cover", image: "h-[320px] lg:h-[470px] w-full object-cover" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
