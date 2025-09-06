import { anchors } from "@/app/(app)/_layout-resources/anchors";
import ContentWrapper from "@/shared/components/ContentWrapper";
import Icons from "@/shared/components/icons";
import Plus from "@/shared/components/Plus";
import getLanguage from "@/shared/utils/get-language";
import { TNextParams } from "@/shared/types/t-next-page";
import Link from "next/link";

export default async function Footer(props: { params: TNextParams }) {
  const lang = await getLanguage(props.params);

  const ancs = anchors(lang);

  return (
    <footer className="bg-neutral-900 px-4 pb-32">
      <ContentWrapper element="div" className="relative flex flex-col items-center gap-10 border-[.5px] border-neutral-600 py-32">
        <Plus positions={{ x: 0, y: 0 }} />
        <Plus positions={{ x: "100%", y: 0 }} />
        <Plus positions={{ x: 0, y: "100%" }} />
        <Plus positions={{ x: "100%", y: "100%" }} />
        <div className="flex flex-wrap items-center justify-center gap-4 text-center font-extralight">
          {ancs.map((anchor, key) => (
            <Link key={key} href={anchor.href} className="text-sm text-neutral-100 transition-colors hover:text-neutral-300 md:text-base">
              {anchor.label}
            </Link>
          ))}
        </div>

        <h2 className="text-center text-4xl font-extralight text-neutral-100 md:text-6xl">Naim Codeseda</h2>
        <div className="flex gap-4 md:gap-8">
          {socials.map((social, key) => (
            <Link key={key} href={social.href} className="text-neutral-500 transition-colors hover:text-neutral-100" target="_blank" rel="noopener noreferrer">
              {social.icon}
            </Link>
          ))}
        </div>
      </ContentWrapper>
      <p className="mt-4 text-center text-sm text-neutral-500">©2025 Naim Codesada. All Rights reserved</p>
    </footer>
  );
}

const socials = [
  { href: "mailto:Naimcodeseda.global@gmail.com", icon: <Icons.Carbon.Email /> },
  { href: "https://www.instagram.com/naimcodesedat", icon: <Icons.Carbon.LogoInstagram /> },
  { href: "https://youtube.com/@naimcodesedatielas?si=iMKU7szuHm_wgIyV", icon: <Icons.Carbon.LogoYoutube /> },
  { href: "https://wa.me/34673545141", icon: <Icons.Carbon.Phone /> },
];
