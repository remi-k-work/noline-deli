// component css styles
import styles from "./NotFound.module.css";

// other libraries
import { cn } from "@/lib/utils";

// assets
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

// types
interface NotFoundProps {
  message: string;
}

export default function NotFound({ message }: NotFoundProps) {
  return (
    <h2 className={cn(styles["not-found"], "bg-destructive text-2xl text-destructive-foreground")} role="alert">
      <ExclamationTriangleIcon width={48} height={48} className="flex-none" />
      {message}
    </h2>
  );
}
