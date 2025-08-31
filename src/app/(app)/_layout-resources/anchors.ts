import { TLanguage } from "@/shared/types/tlang";

export const anchors = (lang: TLanguage) => [
  { label: lang === "en-US" ? "ABOUT" : "ACERCA DE", href: "#about" },
  { label: lang === "en-US" ? "PROJECTS" : "PROYECTOS", href: "#projects" },
  { label: lang === "en-US" ? "PRODUCTIONS" : "PRODUCCIONES", href: "#productions" },
  { label: lang === "en-US" ? "CONTACT" : "CONTACTO", href: "#contact" },
];
