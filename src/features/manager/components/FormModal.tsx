"use client";

// component css styles
import styles from "./FormModal.module.css";

// react
import { ReactNode, useEffect, useRef } from "react";

// next
import { useRouter } from "next/navigation";

// types
interface FormModalProps {
  children: ReactNode;
}

export default function FormModal({ children }: FormModalProps) {
  // To be able to call showModal() method on the dialog
  const dialogRef = useRef<HTMLDialogElement>(null);

  // To be able to close the modal
  const { back } = useRouter();

  useEffect(() => {
    // Show the dialog as a modal
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog ref={dialogRef} className={styles["form-modal"]} onClose={() => back()}>
      {children}
    </dialog>
  );
}
