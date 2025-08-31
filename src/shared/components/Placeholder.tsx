import { twMerge } from "tailwind-merge";

type TStylization = { variant: "transparent" | "default" };

type TPlaceholder = {
  title: string;
  description?: string;
  icon: React.ElementType;
  classNames?: Partial<Record<"container" | "p", string>>;
  stylization?: TStylization;
  element?: "div" | "li";
};
export default function Placeholder(props: TPlaceholder) {
  const stylization = placeholderStylization(props.stylization);
  const Element = props.element || "div";

  return (
    <Element className={twMerge("flex w-full flex-col items-center justify-center rounded-md px-8 py-14 text-center", stylization.container, props.classNames?.container)}>
      <props.icon className="h-8 w-8 text-neutral-800" />
      <h4 className="mt-4 max-w-[354px] text-neutral-700">{props.title}</h4>
      {props.description && <p className={twMerge("mt-2 max-w-[354px] text-sm", props.classNames?.p)}>{props.description}</p>}
    </Element>
  );
}

const placeholderStylization = (props?: TStylization) => {
  const variant = props?.variant || "default";

  let containerClassName = "";
  if (variant === "default") containerClassName = "bg-neutral-background-rest border-neutral-stroke-rest border";

  return { container: containerClassName };
};
