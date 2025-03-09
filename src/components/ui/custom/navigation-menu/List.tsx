// component css styles
import styles from "./List.module.css";

// react
import { ComponentProps } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { List as RdxList } from "@radix-ui/react-navigation-menu";

export default function List({ className, ...props }: ComponentProps<typeof RdxList>) {
  return <RdxList className={cn(styles["list"], className)} {...props} />;
}
