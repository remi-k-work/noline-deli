// component css styles
import styles from "./Content.module.css";

// react
import { ReactNode } from "react";

// other libraries
import { cn } from "@/lib/utils";

// types
interface ContentProps {
  children: ReactNode;
  className?: string;
}

export default function Content({ children, className }: ContentProps) {
  return <header className={cn(styles["content"], className)}>{children}</header>;
}
