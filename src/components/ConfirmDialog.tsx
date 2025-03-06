// component css styles
import styles from "./ConfirmDialog.module.css";

// react
import { forwardRef, ReactNode } from "react";

// other libraries
import { cn } from "@/lib/utils";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { lusitana } from "@/assets/fonts";
import { HandThumbUpIcon, HandThumbDownIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

// types
interface ConfirmDialogProps {
  onConfirmed: () => void;
  children: ReactNode;
}

const ConfirmDialog = forwardRef<HTMLDialogElement, ConfirmDialogProps>(({ onConfirmed, children, ...props }: ConfirmDialogProps, ref) => {
  return (
    <dialog ref={ref} className={styles["confirm-dialog"]} {...props}>
      <form method="dialog">
        <header className={cn(lusitana.className, "bg-linear-to-r from-primary to-secondary text-xl text-primary-foreground")} data-testid="titleBar">
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
});
ConfirmDialog.displayName = "ConfirmDialog";

export default ConfirmDialog;
