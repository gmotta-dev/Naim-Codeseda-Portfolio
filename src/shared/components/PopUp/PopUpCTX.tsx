'use client'

import { createContext } from "react";

import usePopUpStates, { TUsePopUpStates } from "./usePopUpStates";
import PopUp from "./PopUp";

export const popUpCTX = createContext<TUsePopUpStates>({} as TUsePopUpStates);

export default function PopUpProvider({ children }: { children: React.ReactNode }) {
  const popUpStates = usePopUpStates();

  return (
    <popUpCTX.Provider value={popUpStates}>
      <PopUp {...popUpStates} />
      {children}
    </popUpCTX.Provider>
  );
}
