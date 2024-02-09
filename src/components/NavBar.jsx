// component css styles
import styles from "./NavBar.module.css";

// next
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className={styles["navbar"]}>
      <ul className={styles["navbar__list"]}>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/"}>
            <span className={styles["navbar__view-all-posts"]}></span>
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <span className={styles["navbar__create-a-new-post"]}></span>
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <span className={styles["navbar__view-all-users"]}></span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
