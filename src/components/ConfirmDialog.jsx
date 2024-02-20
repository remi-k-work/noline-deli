/* eslint-disable react/display-name */

// component css styles
import styles from "./ConfirmDialog.module.css";

// react
import { forwardRef } from "react";

// other libraries
import clsx from "clsx";
import { HandThumbUpIcon, HandThumbDownIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

// assets
import { lusitana } from "@/assets/fonts";

const ConfirmDialog = forwardRef(({ message, onConfirmed }, ref) => {
  return (
    <dialog ref={ref} className={clsx(styles["confirm-dialog"], "modal")}>
      <div className="modal-box p-0">
        <h3
          className={clsx(lusitana.className, styles["confirm-dialog__title-bar"], "bg-gradient-to-r from-primary to-secondary text-xl font-bold text-neutral")}
        >
          <QuestionMarkCircleIcon width={32} height={32} />
          Please Confirm!
        </h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <form method="dialog">
            <button type="submit" className="btn btn-warning m-4" onClick={() => onConfirmed && onConfirmed()}>
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

export default ConfirmDialog;
