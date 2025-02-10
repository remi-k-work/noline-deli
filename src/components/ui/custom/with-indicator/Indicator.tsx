// component css styles
import styles from "./Indicator.module.css";

// react
import { ReactNode } from "react";

// types
interface IndicatorProps {
  children: ReactNode;
}

export default function Indicator({ children }: IndicatorProps) {
  return <header className={styles["indicator"]}>{children}</header>;
}
