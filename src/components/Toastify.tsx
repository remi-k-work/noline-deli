// component css styles
import styles from "./Toastify.module.css";

// react
import { useEffect, useRef } from "react";

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
  // To maintain referential equality and minimize excessive effect dependencies
  const onTimedOutRef = useRef(onTimedOut);

  useEffect(() => {
    // On timeout, the parent component will unmount this toastify in its "ontimedout" event handler
    const timeoutId = setTimeout(onTimedOutRef.current, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className={clsx(styles["toastify"], "toast", hPos, vPos)}>
      <div className={clsx("alert", type)}>
        <div>{children}</div>
      </div>
    </section>
  );
}
