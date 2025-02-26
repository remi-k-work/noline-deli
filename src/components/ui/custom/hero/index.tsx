// component css styles
import styles from "./index.module.css";

// react
import { ReactNode } from "react";

// other libraries
import { cn } from "@/lib/utils";

// components
import Overlay from "./Overlay";
import Content from "./Content";

// types
interface HeroProps {
  children: ReactNode;
  className?: string;
}

export default function Hero({ children, className }: HeroProps) {
  return <article className={cn(styles["hero"], className)}>{children}</article>;
}

export { Overlay as HeroOverlay, Content as HeroContent };
