// component css styles
import styles from "./index.module.css";

// react
import { ReactNode } from "react";

// other libraries
import { cn } from "@/lib/utils";

// components
import Indicator from "./Indicator";

// types
interface WithIndicatorProps {
  hPos?: "start" | "center" | "end";
  vPos?: "top" | "middle" | "bottom";
  children: ReactNode;
}

export default function WithIndicator({ hPos = "end", vPos = "top", children }: WithIndicatorProps) {
  return <article className={cn(styles["with-indicator"], styles[`with-indicator--${hPos}`], styles[`with-indicator--${vPos}`])}>{children}</article>;
}

export { Indicator };
