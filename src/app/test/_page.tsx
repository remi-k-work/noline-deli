// component css styles
import styles from "./page.module.css";

// components
import FormModal from "@/features/manager/components/FormModal";

export default async function Page() {
  return (
    <article className={styles["page"]}>
      <FormModal>Test</FormModal>
    </article>
  );
}
