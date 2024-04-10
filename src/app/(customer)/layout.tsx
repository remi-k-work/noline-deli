// component css styles
import styles from "./layout.module.css";

// other libraries
import clsx from "clsx";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={clsx(styles["layout"], "drawer lg:drawer-open")}>
      <input id="navBar" type="checkbox" className="drawer-toggle" />
      {children}
    </div>
  );
}
