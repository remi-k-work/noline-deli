// component css styles
import styles from "./Indicator.module.css";

// react
import { ComponentProps } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { Indicator as RdxIndicator } from "@radix-ui/react-navigation-menu";

// assets
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

export default function Indicator({ className, ...props }: ComponentProps<typeof RdxIndicator>) {
  return (
    <RdxIndicator className={cn(styles["indicator"], className)} {...props}>
      <ChevronUpDownIcon width={24} height={24} />
    </RdxIndicator>
  );
}
