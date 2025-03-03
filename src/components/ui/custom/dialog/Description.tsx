// component css styles
import styles from "./Description.module.css";

// react
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { Description as RdxDescription } from "@radix-ui/react-dialog";

const Description = forwardRef<ElementRef<typeof RdxDescription>, ComponentPropsWithoutRef<typeof RdxDescription>>(({ className, ...props }, ref) => (
  <RdxDescription ref={ref} className={cn(styles["description"], className)} {...props} />
));
Description.displayName = RdxDescription.displayName;

export default Description;
