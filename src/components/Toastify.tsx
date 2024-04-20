// component css styles
import styles from "./Toastify.module.css";

// react
import { useEffect } from "react";

// other libraries
import clsx from "clsx";

// types
interface ToastifyProps {
  hPos?: "toast-start" | "toast-center" | "toast-end";
  vPos?: "toast-top" | "toast-middle" | "toast-bottom";
  type?: "alert-info" | "alert-success" | "alert-warning";
  onTimedOut: () => void;
  children: React.ReactNode;
}

export default function Toastify({ hPos, vPos, type = "alert-info", onTimedOut, children }: ToastifyProps) {
  useEffect(() => {
    function onTimeout() {
      onTimedOut();
    }

    const timeoutId = setTimeout(onTimeout, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onTimedOut]);

  return (
    <section className={clsx(styles["toastify"], "toast", hPos, vPos)}>
      <div className={clsx("alert", type)}>
        <div>{children}</div>
      </div>
    </section>
  );
}
