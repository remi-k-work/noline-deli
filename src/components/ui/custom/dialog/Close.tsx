// component css styles
import styles from "./Close.module.css";

// react
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { Close as RdxClose } from "@radix-ui/react-dialog";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { XCircleIcon } from "@heroicons/react/24/solid";

const Close = forwardRef<ElementRef<typeof RdxClose>, ComponentPropsWithoutRef<typeof RdxClose>>(({ className, ...props }, ref) => (
  <RdxClose ref={ref} className={cn(styles["close"], className)} asChild {...props}>
    <Button type="button" size="icon" variant="ghost" aria-label="Close">
      <XCircleIcon width={36} height={36} />
    </Button>
  </RdxClose>
));
Close.displayName = RdxClose.displayName;

export default Close;
