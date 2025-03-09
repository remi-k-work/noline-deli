// component css styles
import styles from "./Content.module.css";

// react
import { ComponentProps } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { Content as RdxContent } from "@radix-ui/react-navigation-menu";

export default function Content({ className, ...props }: ComponentProps<typeof RdxContent>) {
  return <RdxContent className={cn(styles["content"], className)} {...props} />;
}
