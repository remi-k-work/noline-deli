// component css styles
import styles from "./index.module.css";

// react
import { ReactNode } from "react";

// components
import Indicator from "./Indicator";

// types
interface WithIndicatorProps {
  children: ReactNode;
}

export default function WithIndicator({ children }: WithIndicatorProps) {
  return <article className={styles["with-indicator"]}>{children}</article>;
}

export { Indicator };
