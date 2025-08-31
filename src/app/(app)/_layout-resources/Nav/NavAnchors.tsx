"use client";

import Icons from "@/shared/components/icons";
import Link from "next/link";
import { Fragment, Suspense, useEffect, useState } from "react";
import { anchors } from "../anchors";
import { useParams } from "next/navigation";
import { TLanguage } from "@/shared/types/tlang";
import { AnimatePresence, motion } from "motion/react";

export default function NavAnchors() {
  return (
    <Suspense>
      <SuspensedEl />
    </Suspense>
  );
}

const SuspensedEl = () => {
  const params = useParams();
  const ancs = anchors(params.lang as TLanguage);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) setIsMobileMenuOpen(false);
    else setIsMobileMenuOpen(true);
  }, [isMobile]);

  if (params.lang !== "en-US" && params.lang !== "es-ES") return null;

  return (
    <Fragment>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[110%] right-4 z-50 flex flex-col gap-4 overflow-hidden rounded-sm bg-neutral-50 py-6 text-sm text-neutral-500 shadow-md shadow-neutral-200 md:relative md:top-0 md:right-auto md:ml-auto md:h-auto md:translate-y-0 md:flex-row md:bg-transparent md:py-0 md:shadow-none"
          >
            {ancs.map((anchor) => (
              <Link key={anchor.href} href={anchor.href} className="px-12 py-2 transition-colors hover:text-neutral-800 md:p-0">
                {anchor.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="ml-auto flex items-center gap-2 md:ml-0">
        <Link
          href={params.lang === "en-US" ? "/es-ES" : "/en-US"}
          className="flex items-center gap-2 border-r border-neutral-300 px-4 text-neutral-600 transition-colors hover:text-neutral-800 md:ml-0 md:border-r-0 md:border-l"
        >
          <Icons.Carbon.IbmWatsonLanguageTranslator />
          <span className="text-sm">{params.lang === "en-US" ? "EN" : "ES"}</span>
        </Link>

        <button className="flex h-6 w-6 cursor-pointer flex-col items-center justify-center md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span className={`block h-0.5 w-5 bg-neutral-600 transition-all duration-300 ${isMobileMenuOpen ? "translate-y-1 rotate-[50deg]" : "-translate-y-1"}`}></span>
          <span className={`block h-0.5 w-5 bg-neutral-600 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
          <span className={`block h-0.5 w-5 bg-neutral-600 transition-all duration-300 ${isMobileMenuOpen ? "-translate-y-0 -rotate-[50deg]" : "translate-y-1"}`}></span>
        </button>
      </motion.div>
    </Fragment>
  );
};

export function useIsMobile(MOBILE_BREAKPOINT = 768) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    mql.addEventListener("change", onChange);

    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, [MOBILE_BREAKPOINT]);

  return !!isMobile;
}
