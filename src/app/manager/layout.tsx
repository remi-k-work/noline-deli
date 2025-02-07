// component css styles
import styles from "./layout.module.css";

// react
import { ReactNode } from "react";

// other libraries
import { cn } from "@/lib/utils";

// types
interface LayoutProps {
  formModal: ReactNode;
  children: ReactNode;
}

export default async function Layout({ formModal, children }: LayoutProps) {
  return (
    <article className={cn(styles["layout"], "bg-base-100")}>
      {formModal}
      {children}
    </article>
  );
}
