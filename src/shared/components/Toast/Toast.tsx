"use client";

import { JSX, useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import { TToast } from "./types";
import Icons from "../icons";

/**
 * This a primitive component that is used to display a toast.
 * It is recommended to create a component that returns the classNames for this.
 * Note: each toast has its own classNames, making it possible to render different toast variants on the screen.
 */
export default function Toast({ toasts }: { toasts: TToast[] }): JSX.Element | null {
  const [hovering, setHovering] = useState(false);
  const [height, setHeight] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!toasts.length) setHovering(false);

    if (ref.current) setHeight(ref.current.offsetHeight);

    setIsClient(typeof window === "object");
  }, [toasts]);

  if (!isClient) return null;

  const dialogElement = document.getElementsByTagName("dialog")[0];

  return createPortal(
    <ul onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className="absolute">
      <AnimatePresence>
        {toasts.map((toast, key) => {
          return (
            <motion.li
              ref={ref}
              key={key}
              style={{ zIndex: (key + 1) * 100 }}
              exit={{ opacity: 0, bottom: "-100px" }}
              initial={{ opacity: 0, bottom: "-30px" }}
              transition={{ stiffness: 0, duration: 0.5 }}
              animate={{ opacity: 1, bottom: hovering ? `${(toasts.length - 1 - key) * (height + 12) + 35}px` : `${(toasts.length - 1 - key) * 5 + 35}px` }}
              className={twMerge(
                "fixed left-1/2 flex w-full bg-neutral-800 border shadow-lg shadow-neutral-700 max-w-[320px] -translate-x-1/2 transform items-start justify-start gap-2 rounded-sm py-4 pl-10 pr-[56px] lg:left-auto lg:right-[3%] lg:max-w-[450px] lg:-translate-x-0"
              )}
            >
              <div className={twMerge("flex flex-col")}>
                <div className={`flex gap-2 items-center`}>
                  {toast?.stylization === "error" ? <Icons.Carbon.Error className="text-red-400 w-5 h-5" /> : <Icons.Carbon.CheckmarkFilled className="text-green-500 w-5 h-5" />}
                  <p className={twMerge("text-neutral-100")}>{toast?.title}</p>
                </div>
                <p className={twMerge("mt-2 text-sm text-neutral-300")}>{toast?.description}</p>
              </div>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>,
    dialogElement || document.getElementsByTagName("main")[0] || document.body
  );
}
