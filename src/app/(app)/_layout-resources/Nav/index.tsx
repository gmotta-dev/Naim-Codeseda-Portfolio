import ContentWrapper from "@/shared/components/ContentWrapper";
import NavAnchors from "./NavAnchors";
import { StaggeredFade } from "@/shared/components/StaggeredFade";

export default function Nav() {
  return (
    <ContentWrapper element="nav" className="relative flex h-20 items-center gap-4">
      <StaggeredFade element="h4" text="NAIM CODESEDA" className="neutral-800 text-xl" />
      <NavAnchors />
    </ContentWrapper>
  );
}
