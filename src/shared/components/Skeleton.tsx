import { HTMLAttributes } from "react";

export default function Skeleton(props: HTMLAttributes<HTMLDivElement>) {
  return <div className={`w-full h-full bg-gray-200 animate-pulse ${props.className}`} />;
}