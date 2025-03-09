// component css styles
import styles from "./Viewport.module.css";

// react
import { ComponentProps } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { Viewport as RdxViewport } from "@radix-ui/react-navigation-menu";

export default function Viewport({ className, ...props }: ComponentProps<typeof RdxViewport>) {
  return (
    <div className={styles["viewport-position"]}>
      <RdxViewport className={cn(styles["viewport"], className)} {...props} />
    </div>
  );
}
