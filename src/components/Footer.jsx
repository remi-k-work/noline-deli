// component css styles
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
      <small>
        Random posts and users, courtesy of&nbsp;
        <a href="https://jsonplaceholder.typicode.com/" target="_blank">
          {"{"}JSON{"}"} Placeholder
        </a>
      </small>
    </footer>
  );
}
