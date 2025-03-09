// component css styles
import styles from "./Trigger.module.css";

// react
import { ComponentProps } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { Trigger as RdxTrigger } from "@radix-ui/react-navigation-menu";

// assets
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Trigger({ className, children, ...props }: ComponentProps<typeof RdxTrigger>) {
  return (
    <RdxTrigger className={cn(styles["trigger"], className)} {...props}>
      {children} <ChevronDownIcon width={24} height={24} className={styles["caret-down"]} aria-hidden="true" />
    </RdxTrigger>
  );
}
