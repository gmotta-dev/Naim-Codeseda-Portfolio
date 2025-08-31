import { HTMLAttributes } from "react";

export default function ContentWrapper(props: { element: "div" | "section" | "nav" } & HTMLAttributes<HTMLDivElement>) {
  return (
    <props.element {...props} className={`mx-auto w-full max-w-[1300px] px-4 lg:px-6 ${props.className}`}>
      {props.children}
    </props.element>
  );
}
