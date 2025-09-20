import Icons from "@/shared/components/icons";
import getLanguage from "@/shared/utils/get-language";
import { TNextParams } from "@/shared/types/t-next-page";

export default async function ContactTexts(props: { params: TNextParams }) {
  const lang = await getLanguage(props.params);

  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neutral-900 px-6 font-medium text-neutral-400 lg:left-6 lg:translate-x-0 whitespace-nowrap">{texts.absoluteText[lang]}</span>

      <h4 className="mt-8 text-4xl font-extralight text-neutral-100 md:mt-0 md:text-6xl lg:text-8xl">{texts.title[lang]}</h4>

      <p className="max-w-[460px] text-neutral-400">{texts.description[lang]}</p>

      <div className="mt-6 flex flex-wrap gap-4 lg:flex-col">
        {contactInfo.map((info, key) => (
          <a
            href={info.href}
            className={`flex items-center gap-2 rounded-full bg-neutral-200 p-4 lg:bg-transparent lg:p-0 ${info.className}`}
            key={key}
            target="_blank"
            rel="noopener noreferrer"
          >
            <info.icon className="h-6 w-6 text-neutral-600 lg:text-neutral-200" />
            <span className="hidden font-light text-neutral-300 lg:inline">{typeof info.label === "string" ? info.label : info.label[lang]}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

const contactInfo = [
  { icon: Icons.Carbon.Email, label: "Naimcodeseda.global@gmail.com", href: "mailto:Naimcodeseda.global@gmail.com" },
  { icon: Icons.Carbon.LogoLinkedin, label: "Naim Codeseda Tielas", href: "https://www.linkedin.com/in/naim-codeseda-tielas-5508b0303" },
  {
    icon: Icons.Carbon.Location,
    label: { "en-US": "Spain - Taiwan", "es-ES": "España, Taiwán" },
    className: "hidden lg:flex",
    href: "https://www.google.com/maps/place/Galicia,+Spain/@42.8828822,-9.1398225,8z/data=!3m1!4b1!4m5!3m4!1s0xd2e6a86ce74b089:0x71496539f3297537!8m2!3d42.8828822!4d-8.5375375",
  },
];

const texts = {
  absoluteText: { ["en-US"]: "LETS GET IN TOUTCH", ["es-ES"]: "CONECTÉMOS" },
  title: { ["en-US"]: "CONTACT", ["es-ES"]: "CONTACTO" },
  description: {
    ["en-US"]: "I'm always interested in new collaborations, performance opportunities, and creative projects. Let's discuss how we can work together.",
    ["es-ES"]: "Siempre estoy interesado en nuevas colaboraciones, oportunidades de actuación y proyectos creativos. Vamos a discutir cómo podemos trabajar juntos.",
  },
};
