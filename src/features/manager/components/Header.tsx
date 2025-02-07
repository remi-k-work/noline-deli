// component css styles
import styles from "./Header.module.css";

// other libraries
import { cn } from "@/lib/utils";

// components
import HeaderLogo from "./HeaderLogo";
import NavBar from "./NavBar";
import ThemeSwitcher from "@/features/storefront/components/ThemeSwitcher";
import Logout from "@/features/manager/login/components/Logout";

export default function Header() {
  return (
    <header className={cn(styles["header"], "z-30")}>
      <HeaderLogo />
      <div className="flex items-end gap-2">
        <NavBar />
        <ThemeSwitcher />
        <Logout />
      </div>
    </header>
  );
}
