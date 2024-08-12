// component css styles
import styles from "./ConfirmDialog.module.css";

// react
import { forwardRef, ReactNode } from "react";

// other libraries
import { cn } from "@/lib/utils";

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
    <dialog ref={ref} className={cn(styles["confirm-dialog"], "modal")} {...props}>
      <div className="modal-box p-0">
        <h2
          className={cn(
            lusitana.className,
            styles["confirm-dialog__title-bar"],
            "bg-gradient-to-r from-primary to-secondary text-xl font-bold text-primary-foreground",
          )}
        >
          <QuestionMarkCircleIcon width={32} height={32} />
          Please Confirm!
        </h2>
        <br />
        <div>{children}</div>
        <div className="modal-action">
          <form method="dialog">
            <button type="submit" className="btn btn-warning m-4" onClick={() => onConfirmed()}>
              <HandThumbUpIcon width={24} height={24} />
              Confirm
            </button>
            <button type="submit" className="btn btn-secondary m-4">
              <HandThumbDownIcon width={24} height={24} />
              Cancel
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
});
ConfirmDialog.displayName = "ConfirmDialog";

export default ConfirmDialog;
