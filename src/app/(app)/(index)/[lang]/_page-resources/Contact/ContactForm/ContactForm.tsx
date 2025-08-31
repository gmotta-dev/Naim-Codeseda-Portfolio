"use client";

import Clickables from "@/shared/components/Clickables";
import { TLanguage } from "@/shared/types/tlang";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { zodResolver } from "@hookform/resolvers/zod";
import { TContactFormSchema, contactFormSchema } from "./contact-form-schema";
import { useSafeExecute } from "@/client/hooks/useSafeExecute";
import { contactFormAction } from "./action/contact-form-action";
import Icons from "@/shared/components/icons";

export default function ContactForm() {
  const params = useParams();
  const lang = params.lang as TLanguage;

  const form = useForm<TContactFormSchema>({ resolver: zodResolver(contactFormSchema(lang)) });

  const { execute, transition } = useSafeExecute();

  return (
    <form className="flex max-w-[567px] flex-wrap items-start justify-start gap-4" onSubmit={form.handleSubmit((data) => execute(contactFormAction, data))}>
      <Input
        label={inputsLangs.name.label[lang]}
        placeholder={inputsLangs.name.placeholder[lang]}
        className="w-full flex-1"
        {...form.register("name")}
        error={form.formState.errors.name?.message}
      />

      <Input
        label={inputsLangs.email.label[lang]}
        placeholder={inputsLangs.email.placeholder[lang]}
        className="w-full flex-1"
        {...form.register("email")}
        error={form.formState.errors.email?.message}
      />

      <Textarea
        label={inputsLangs.message.label[lang]}
        placeholder={inputsLangs.message.placeholder[lang]}
        {...form.register("message")}
        error={form.formState.errors.message?.message}
      />

      <Clickables.Button className="w-full flex items-center justify-center gap-2" stylization="secondary">
        {inputsLangs.send[lang]}

        {transition ? <Icons.LoadingSpinner className="h-6 w-6" /> : <Icons.Carbon.MailAll className="h-6 w-6" />}
      </Clickables.Button>
    </form>
  );
}

const Input = (props: { label: string; placeholder: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={twMerge("flex flex-col gap-2", props.className)}>
      <label className="text-sm text-neutral-300">{props.label}</label>
      <input
        {...props}
        className="rounded-sm border border-neutral-700 bg-neutral-800 p-2 text-sm text-neutral-300 hover:border-neutral-600 focus:border-neutral-500 focus:outline-none"
      />
      {props.error && <p className="text-[13px] text-red-400">{props.error}</p>}
    </div>
  );
};

const Textarea = (props: { label: string; placeholder: string; error?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-sm text-neutral-300">{props.label}</label>
      <textarea
        {...props}
        className="h-40 resize-none rounded-sm border border-neutral-700 bg-neutral-800 p-2 text-sm text-neutral-300 hover:border-neutral-600 focus:border-neutral-500 focus:outline-none"
      />
      {props.error && <p className="text-[13px] text-red-400">{props.error}</p>}
    </div>
  );
};

const inputsLangs = {
  name: { label: { "en-US": "Name", "es-ES": "Nombre" }, placeholder: { "en-US": "Your name", "es-ES": "Tu nombre" } },
  email: { label: { "en-US": "Email", "es-ES": "Correo electrónico" }, placeholder: { "en-US": "Your email", "es-ES": "Tu correo electrónico" } },
  message: { label: { "en-US": "Message", "es-ES": "Mensaje" }, placeholder: { "en-US": "Your message", "es-ES": "Tu mensaje" } },
  send: { "en-US": "SEND MESSAGE", "es-ES": "ENVIAR MENSAJE" },
};
