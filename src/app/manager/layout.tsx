// component css styles
import styles from "./layout.module.css";

// react
import { ReactNode } from "react";

// components
import Header from "@/features/manager/components/Header";
import Footer from "@/features/manager/components/Footer";

// types
interface LayoutProps {
  formModal: ReactNode;
  children: ReactNode;
}

export default async function Layout({ formModal, children }: LayoutProps) {
  return (
    <article className={styles["layout"]}>
      <Header />
      <main>
        {formModal}
        {children}
      </main>
      <Footer />
    </article>
  );
}
