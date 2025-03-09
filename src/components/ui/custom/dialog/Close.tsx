// component css styles
import styles from "./Close.module.css";

// react
import { ComponentProps } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { Close as RdxClose } from "@radix-ui/react-dialog";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { XCircleIcon } from "@heroicons/react/24/solid";

export default function Close({ className, ...props }: ComponentProps<typeof RdxClose>) {
  return (
    <RdxClose className={cn(styles["close"], className)} asChild {...props}>
      <Button type="button" size="icon" variant="ghost" aria-label="Close">
        <XCircleIcon width={36} height={36} />
      </Button>
    </RdxClose>
  );
}
