// component css styles
import styles from "./Indicator.module.css";

// react
import { ReactNode } from "react";

// other libraries
import { cn } from "@/lib/utils";

// types
interface IndicatorProps {
  hPos?: "start" | "center" | "end";
  vPos?: "top" | "middle" | "bottom";
  children: ReactNode;
}

export default function Indicator({ hPos = "end", vPos = "top", children }: IndicatorProps) {
  return <section className={cn(styles["indicator"], styles[`indicator--${hPos}`], styles[`indicator--${vPos}`])}>{children}</section>;
}
