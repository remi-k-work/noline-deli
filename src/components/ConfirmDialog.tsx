// component css styles
import styles from "./ConfirmDialog.module.css";

// react
import { ComponentProps } from "react";

// other libraries
import { cn } from "@/lib/utils";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { lusitana } from "@/assets/fonts";
import { HandThumbUpIcon, HandThumbDownIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

// types
interface ConfirmDialogProps extends ComponentProps<"dialog"> {
  onConfirmed: () => void;
}

export default function ConfirmDialog({ onConfirmed, children, ...props }: ConfirmDialogProps) {
  return (
    <dialog className={styles["confirm-dialog"]} {...props}>
      <form method="dialog">
        <header className={cn(lusitana.className, "from-primary to-secondary text-primary-foreground bg-linear-to-r text-xl")} data-testid="titleBar">
          <QuestionMarkCircleIcon width={32} height={32} />
          Please Confirm!
        </header>
        <article>{children}</article>
        <footer>
          <Button type="submit" variant="destructive" onClick={() => onConfirmed()} data-testid="confirmButton">
            <HandThumbUpIcon width={24} height={24} />
            Confirm
          </Button>
          <Button type="submit" data-testid="cancelButton">
            <HandThumbDownIcon width={24} height={24} />
            Cancel
          </Button>
        </footer>
      </form>
    </dialog>
  );
}
