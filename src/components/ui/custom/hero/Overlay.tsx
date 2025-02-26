// component css styles
import styles from "./Overlay.module.css";

// react
import { ReactNode } from "react";

// other libraries
import { cn } from "@/lib/utils";

// types
interface OverlayProps {
  children: ReactNode;
  className?: string;
}

export default function Overlay({ children, className }: OverlayProps) {
  return <footer className={cn(styles["overlay"], className)}>{children}</footer>;
}
