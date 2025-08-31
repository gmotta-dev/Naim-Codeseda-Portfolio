import { HTMLAttributes } from "react";
import { clickableStylization, TClickableStylization } from "./clickable-stylization";
import { twMerge } from "tailwind-merge";

export const Button = ({ stylization = "primary", ...props }: HTMLAttributes<HTMLButtonElement> & { stylization?: TClickableStylization }) => {
  return (
    <button {...props} className={twMerge(clickableStylization(stylization), props.className)} >
      {props.children}
    </button>
  );
};
