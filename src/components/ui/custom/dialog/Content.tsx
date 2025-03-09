// component css styles
import styles from "./Content.module.css";

// react
import { ComponentProps } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { Content as RdxContent, Portal } from "@radix-ui/react-dialog";

// components
import Overlay from "./Overlay";
import Close from "./Close";

export default function Content({ className, children, ...props }: ComponentProps<typeof RdxContent>) {
  return (
    <Portal>
      <Overlay />
      <RdxContent className={cn(styles["content"], className)} {...props}>
        {children}
        <Close />
      </RdxContent>
    </Portal>
  );
}
