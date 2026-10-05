// component css styles
import styles from "./layout.module.css";

// react
import { ReactNode } from "react";

// components
import Header from "@/features/manager/components/Header";
import Footer from "@/features/manager/components/Footer";

// next
import type { Metadata } from "next";

// types
interface LayoutProps {
  formModal: ReactNode;
  children: ReactNode;
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

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
