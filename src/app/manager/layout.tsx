// component css styles
import styles from "./layout.module.css";

// other libraries
import clsx from "clsx";

// components
import Header from "@/features/manager/components/Header";
import Footer from "@/features/manager/components/Footer";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className={clsx(styles["layout"], "bg-base-100")}>
      <Header />
      <main className={styles["layout__main"]}>{children}</main>
      <Footer />
    </section>
  );
}
