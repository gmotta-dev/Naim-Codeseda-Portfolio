import { ComponentProps } from "react";
import { clickableStylization, TClickableStylization } from "./clickable-stylization";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

export const ClickableLink = ({ stylization = "primary", ...props }: ComponentProps<typeof Link> & { stylization?: TClickableStylization }) => {
  return (
    <Link {...props} className={twMerge(clickableStylization(stylization), props.className)}>
      {props.children}
    </Link>
  );
};
