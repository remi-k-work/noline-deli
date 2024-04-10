// component css styles
import styles from "./layout.module.css";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles["layout"]}>
      <p>Welcome in the Manager!</p>
      {children}
    </section>
  );
}
