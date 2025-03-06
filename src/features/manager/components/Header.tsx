// component css styles
import styles from "./Header.module.css";

// other libraries
import { cn } from "@/lib/utils";

// components
import HeaderLogo from "./HeaderLogo";
import NavBar from "./NavBar";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Logout from "@/features/manager/login/components/Logout";

export default function Header() {
  return (
    <header className={cn(styles["header"], "z-[3]")}>
      <HeaderLogo />
      <NavBar />
      <section className="flex flex-none items-center gap-1">
        <ThemeSwitcher />
        <Logout />
      </section>
    </header>
  );
}
