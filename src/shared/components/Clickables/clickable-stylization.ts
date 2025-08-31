export type TClickableStylization = "primary" | "secondary";

export const clickableStylization = (stylization: TClickableStylization) => {
  let className = "h-12 flex items-center justify-center rounded-sm text-center px-6 tracking-wider  transition-colors duration-200 cursor-pointer";

  switch (stylization) {
    case "primary":
      className += " bg-neutral-900 text-white hover:bg-neutral-700";
      break;
    case "secondary":
      className += " bg-neutral-50 text-neutral-600 border border-neutral-600 hover:bg-neutral-300";
      break;
  }

  return className;
};
