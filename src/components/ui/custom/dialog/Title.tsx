// component css styles
import styles from "./Title.module.css";

// react
import { ComponentProps } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { Title as RdxTitle } from "@radix-ui/react-dialog";

export default function Title({ className, ...props }: ComponentProps<typeof RdxTitle>) {
  return <RdxTitle className={cn(styles["title"], className)} {...props} />;
}
