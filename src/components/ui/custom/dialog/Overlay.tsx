// component css styles
import styles from "./Overlay.module.css";

// react
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { Overlay as RdxOverlay } from "@radix-ui/react-dialog";

const Overlay = forwardRef<ElementRef<typeof RdxOverlay>, ComponentPropsWithoutRef<typeof RdxOverlay>>(({ className, ...props }, ref) => (
  <RdxOverlay ref={ref} className={cn(styles["overlay"], className)} {...props} />
));
Overlay.displayName = RdxOverlay.displayName;

export default Overlay;
