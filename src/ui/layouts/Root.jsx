// component css styles
import styles from "./Root.module.css";

// components
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Root({ children }) {
  return (
    <div className={styles["root"]}>
      <Header />
      <NavBar />
      <main className={styles["main"]}>{children}</main>
      <Footer />
    </div>
  );
}
