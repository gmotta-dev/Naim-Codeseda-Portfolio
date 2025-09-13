"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import Carousel from "./Carousel";
import { Project } from "@/payload-types";
import RichTextComponent from "@/shared/components/RichText";
import { motion } from "motion/react";
import Icons from "@/shared/components/icons";

export default function ProjectsClient(props: { projects: Project[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currProject = props.projects[selectedIndex];

  if (!currProject) {
    return null;
  }

  return (
    <div className="relative flex flex-col gap-12 min-[1340px]:flex-row">
      <Dots selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} projects={props.projects} />

      <motion.div
        className="flex flex-col items-start gap-12 lg:flex-row"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -300px 0px" }}
        transition={{ duration: 0.5 }}
        key={selectedIndex}
      >
        <ProjectInfo category={currProject.category} projectDate={currProject.projectDate} title={currProject.title} description={currProject.description} />
        <Carousel images={currProject.images} youtubeVideos={currProject.youtubeVideos} />
      </motion.div>
    </div>
  );
}

const Dots = (props: { selectedIndex: number; setSelectedIndex: (index: number) => void; projects: Project[] }) => {
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [timeProgress, setTimeProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance projects every 20 seconds
  useEffect(() => {
    if (!autoAdvance) return;
    //@ts-ignore
    intervalRef.current = setInterval(() => props.setSelectedIndex((prev) => (prev + 1) % props.projects.length), 20000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoAdvance, props.projects.length]);

  // Progress bar animation
  useEffect(() => {
    if (!autoAdvance) return;
    setTimeProgress(0);
    progressRef.current = setInterval(() => setTimeProgress((prev) => (prev >= 100 ? 0 : prev + 1)), 200);

    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [props.selectedIndex, autoAdvance]);

  // Stop auto-advance when user interacts
  const handleUserInteraction = useCallback(() => {
    setAutoAdvance(false);
    setTimeProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, []);

  const scrollTo = useCallback(
    (index: number) => {
      handleUserInteraction();
      props.setSelectedIndex(index);
    },
    [props.setSelectedIndex, handleUserInteraction],
  );

  const handleClickDirection = (direction: "up" | "down") => {
    handleUserInteraction();
    props.setSelectedIndex(direction === "up" ? props.selectedIndex - 1 : props.selectedIndex + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="z-[9] flex items-center gap-4 min-[1340px]:absolute min-[1340px]:top-[0%] min-[1340px]:-left-12 min-[1340px]:-translate-x-1/2 min-[1340px]:flex-col"
    >
      <button
        className="cursor-pointer text-neutral-700 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 -rotate-90 min-[1340px]:-rotate-0"
        disabled={props.selectedIndex === 0}
        onClick={() => handleClickDirection("up")}
      >
        <Icons.Carbon.CaretUp className="h-10 w-10" />
      </button>

      <div className="flex gap-4 min-[1340px]:flex-col">
        {props.projects.map((_, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => scrollTo(index)}
              className={`h-4 w-4 cursor-pointer rounded-full transition-all duration-300 ${
                index === props.selectedIndex ? "scale-110 bg-black" : "border border-neutral-400 hover:border-neutral-600 hover:bg-neutral-600"
              }`}
            />
            {/* Progress ring for current project */}
            {index === props.selectedIndex && (
              <svg className="absolute top-[9.1px] left-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 -rotate-90 transform" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" fill="none" className="text-neutral-300" />
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  className="text-neutral-600"
                  strokeDasharray={`${2 * Math.PI * 6}`}
                  strokeDashoffset={`${2 * Math.PI * 6 * (1 - timeProgress / 100)}`}
                  strokeLinecap="round"
                  style={{
                    transition: "stroke-dashoffset 0.1s ease-in-out",
                  }}
                />
              </svg>
            )}
          </div>
        ))}
      </div>

      <button
        className="cursor-pointer text-neutral-700 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 -rotate-90 min-[1340px]:-rotate-0"
        disabled={props.selectedIndex === props.projects.length - 1}
        onClick={() => handleClickDirection("down")}
      >
        <Icons.Carbon.CaretDown className="h-10 w-10" />
      </button>
    </motion.div>
  );
};

const ProjectInfo = (props: Pick<Project, "category" | "projectDate" | "title" | "description">) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  return (
    <div className="relative z-[8] h-full lg:min-h-[470px] flex-1 flex-grow">
      <div className="absolute -top-4 -right-40 z-[-1] h-[105%] w-screen bg-gradient-to-r from-[#F5F5F5] from-96% via-[#F5F5F5] via-4% to-transparent" />

      <div className="animate-fade-in">
        <div className="mb-4 text-xs font-light tracking-widest text-gray-600">
          {props.category} | {formatDate(props.projectDate)}
        </div>
        <div className="mb-4 text-3xl leading-tight font-bold text-black lg:mb-8">{props.title}</div>
        <div className="space-y-4 text-sm leading-relaxed text-gray-700 lg:text-base">
          <RichTextComponent content={props.description} className="text-neutral-700" />
        </div>
      </div>
    </div>
  );
};
