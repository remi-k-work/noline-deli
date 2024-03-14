// component css styles
import styles from "./Footer.module.css";

// next
import Image from "next/image";

// other libraries
import clsx from "clsx";

// assets
import logo from "@/assets/logo.svg";

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
      <div className="hidden lg:footer">
        <aside>
          <Image src={logo} alt={"Logo"} className="h-14 w-14" />
          <p>
            NoLine-Deli Ltd.
            <br />
            &quot;Taste of Home, Delivered since 1992&quot;
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link-hover link">Branding</a>
          <a className="link-hover link">Design</a>
          <a className="link-hover link">Marketing</a>
          <a className="link-hover link">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link-hover link">About us</a>
          <a className="link-hover link">Contact</a>
          <a className="link-hover link">Jobs</a>
          <a className="link-hover link">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link-hover link">Terms of use</a>
          <a className="link-hover link">Privacy policy</a>
          <a className="link-hover link">Cookie policy</a>
        </nav>
      </div>
      <div className="footer footer-center lg:hidden">
        <aside className="flex place-items-center gap-4">
          <Image src={logo} alt={"Logo"} className="h-14 w-14" />
          <p>
            NoLine-Deli Ltd.
            <br />
            &quot;Taste of Home, Delivered since 1992&quot;
          </p>
        </aside>
      </div>
    </footer>
  );
}
