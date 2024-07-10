// component css styles
import styles from "./layout.module.css";

// other libraries
import { cn } from "@/lib/utils";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn(styles["layout"], "drawer lg:drawer-open")}>
      <input id="navBar" type="checkbox" className="drawer-toggle" />
      {children}
    </div>
  );
}
