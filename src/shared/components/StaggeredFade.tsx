"use client";
import { motion, useInView } from "motion/react";
import * as React from "react";

export const StaggeredFade = (props: { text: string; className?: string; duration?: number; element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" }) => {
  const variants = { hidden: { opacity: 0 }, show: (i: number) => ({ y: 0, opacity: 1, transition: { delay: i * (props.duration || 0.07) } }) };

  const letters = props.text.split("");
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const Element = motion[props.element || "p"];

  return (
    <Element ref={ref} initial="hidden" animate={isInView ? "show" : ""} variants={variants} viewport={{ once: true }} className={props.className}>
      {letters.map((word, i) => (
        <motion.span key={`${word}-${i}`} variants={variants} custom={i}>
          {word}
        </motion.span>
      ))}
    </Element>
  );
};
