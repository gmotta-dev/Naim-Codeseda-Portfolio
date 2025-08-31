import ContentWrapper from "@/shared/components/ContentWrapper";
import { TNextParams } from "@/shared/types/t-next-page";
import ContactTexts from "./ContactTexts";
import Plus from "@/shared/components/Plus";
import ContactForm from "./ContactForm/ContactForm";
import { Suspense } from "react";

export default function Contact(props: { params: TNextParams }) {
  return (
    <section id="contact" className="bg-neutral-900 px-4 pt-32 mt-32" >
      <ContentWrapper
        element="div"
        className="relative flex flex-col items-center justify-center gap-8 border-[.5px] border-b-0 border-neutral-600 pt-6 pb-32 lg:flex-row lg:justify-between"
      >
        <Plus positions={{ x: "100%", y: 0 }} />

        <Suspense>
          <ContactTexts params={props.params} />
          <ContactForm />
        </Suspense>
      </ContentWrapper>
    </section>
  );
}
