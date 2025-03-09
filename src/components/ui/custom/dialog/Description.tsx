// component css styles
import styles from "./Description.module.css";

// react
import { ComponentProps } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { Description as RdxDescription } from "@radix-ui/react-dialog";

export default function Description({ className, ...props }: ComponentProps<typeof RdxDescription>) {
  return <RdxDescription className={cn(styles["description"], className)} {...props} />;
}
