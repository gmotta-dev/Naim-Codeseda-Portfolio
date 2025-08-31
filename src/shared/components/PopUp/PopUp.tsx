"use client";

import React, { useEffect, useState } from "react";

import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";

import { TUsePopUpStates } from "./usePopUpStates";

export default function PopUp(props: TUsePopUpStates) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const popUpContent = (
    <AnimatePresence>
      {props.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-neutral-950/80"
          onClick={(e) => e.target === e.currentTarget && props.close()}>
          {props.content}
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return createPortal(popUpContent, document.getElementsByTagName("main")[0] || document.body);
}
