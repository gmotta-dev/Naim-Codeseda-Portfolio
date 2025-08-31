"use client";

import { createContext } from "react";
import Toast from "./Toast";
import useToastStates from "./useToastStates";


export const toastCTX = createContext<ReturnType<typeof useToastStates>>({} as ReturnType<typeof useToastStates>);

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const toastStates = useToastStates();

  return (
    <toastCTX.Provider value={toastStates}>
      <Toast {...toastStates} />
      {children}
    </toastCTX.Provider>
  );
}
