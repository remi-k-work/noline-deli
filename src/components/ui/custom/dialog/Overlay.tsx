// component css styles
import styles from "./Overlay.module.css";

// react
import { ComponentProps } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { Overlay as RdxOverlay } from "@radix-ui/react-dialog";

export default function Overlay({ className, ...props }: ComponentProps<typeof RdxOverlay>) {
  return <RdxOverlay className={cn(styles["overlay"], className)} {...props} />;
}
