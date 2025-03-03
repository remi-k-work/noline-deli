// component css styles
import styles from "./Title.module.css";

// react
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { Title as RdxTitle } from "@radix-ui/react-dialog";

const Title = forwardRef<ElementRef<typeof RdxTitle>, ComponentPropsWithoutRef<typeof RdxTitle>>(({ className, ...props }, ref) => (
  <RdxTitle ref={ref} className={cn(styles["title"], className)} {...props} />
));
Title.displayName = RdxTitle.displayName;

export default Title;
