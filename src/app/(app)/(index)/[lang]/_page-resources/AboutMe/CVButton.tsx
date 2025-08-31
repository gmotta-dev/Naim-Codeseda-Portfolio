"use client";

import Clickables from "@/shared/components/Clickables";
import { getActiveCV } from "./cv-actions";
import { useSafeExecute } from "@/client/hooks/useSafeExecute";
import Icons from "@/shared/components/icons";

export default function CVButton() {
  const { execute, transition } = useSafeExecute();

  const handleCVClick = async () => await execute(getActiveCV, {});

  return (
    <Clickables.Button className="w-full max-w-[120px] md:max-w-[156px] flex items-center justify-center gap-2" onClick={handleCVClick}>
      <span>CV</span>
      {transition ? <Icons.LoadingSpinner /> : <Icons.Carbon.CloudDownload />}
    </Clickables.Button>
  );
}
