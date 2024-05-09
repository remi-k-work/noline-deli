// component css styles
import styles from "./NotFound.module.css";

// other libraries
import clsx from "clsx";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function NotFound({ message }) {
  return (
    <h2 className={clsx(styles["not-found"], "bg-error text-2xl text-warning-content")} role="alert">
      <ExclamationTriangleIcon width={48} height={48} className="flex-none" />
      {message}
    </h2>
  );
}
