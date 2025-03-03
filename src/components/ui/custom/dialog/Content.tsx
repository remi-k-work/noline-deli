// component css styles
import styles from "./Content.module.css";

// react
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { Content as RdxContent, Portal } from "@radix-ui/react-dialog";

// components
import Overlay from "./Overlay";
import Close from "./Close";

const Content = forwardRef<ElementRef<typeof RdxContent>, ComponentPropsWithoutRef<typeof RdxContent>>(({ className, children, ...props }, ref) => (
  <Portal>
    <Overlay />
    <RdxContent ref={ref} className={cn(styles["content"], className)} {...props}>
      {children}
      <Close />
    </RdxContent>
  </Portal>
));
Content.displayName = RdxContent.displayName;

export default Content;
