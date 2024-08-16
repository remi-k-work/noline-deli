// component css styles
import styles from "./page.module.css";

// components
import BrandForm from "@/features/manager/brands/components/BrandForm";
import CounterTest from "./CounterTest";

export default async function Page() {
  return (
    <article className={styles["page"]}>
      <BrandForm />
      <br />
      <CounterTest />
    </article>
  );
}
