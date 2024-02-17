/* the props */
import "open-props/style";

/* optional imports that use the props */
import "open-props/normalize";

import "./globals.css";

// other libraries
import clsx from "clsx";

// layouts and pages
import Root from "@/ui/layouts/Root";

// assets
import { inter } from "@/assets/fonts";

export const metadata = {
  title: "NoLine-Deli",
  description: "Welcome to our online store!",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "antialiased")}>
        <Root>{children}</Root>
      </body>
    </html>
  );
}
