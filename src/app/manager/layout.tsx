// component css styles
import styles from "./layout.module.css";

// react
import { ReactNode } from "react";

// other libraries
import { cn } from "@/lib/utils";

// components
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/features/manager/components/Header";
import Footer from "@/features/manager/components/Footer";

// types
interface LayoutProps {
  formModal: ReactNode;
  children: ReactNode;
}

export default async function Layout({ formModal, children }: LayoutProps) {
  return (
    <section className={cn(styles["layout"], "bg-base-100")}>
      <Header />
      <main className={styles["layout__main"]}>
        <TooltipProvider>
          {formModal}
          {children}
        </TooltipProvider>
      </main>
      <Footer />
    </section>
  );
}
