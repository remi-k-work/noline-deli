// component css styles
import styles from "./Footer.module.css";

// next
import Image from "next/image";

// assets
import { lusitana } from "@/assets/fonts";
import logo from "@/assets/logo.svg";

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
      <aside>
        <Image src={logo} alt={"Logo"} className="size-14" />
        <p className={lusitana.className}>
          NoLine-Deli Ltd.
          <br />
          Taste of Home Delivered
        </p>
      </aside>
      <nav>
        <h6 className={lusitana.className}>Services</h6>
        <a className="link">Branding</a>
        <a className="link">Design</a>
        <a className="link">Marketing</a>
        <a className="link">Advertisement</a>
      </nav>
      <nav>
        <h6 className={lusitana.className}>Company</h6>
        <a className="link">About us</a>
        <a className="link">Contact</a>
        <a className="link">Jobs</a>
        <a className="link">Press kit</a>
      </nav>
      <nav>
        <h6 className={lusitana.className}>Legal</h6>
        <a className="link">Terms of use</a>
        <a className="link">Privacy policy</a>
        <a className="link">Cookie policy</a>
      </nav>
    </footer>
  );
}
