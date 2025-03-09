// component css styles
import styles from "./Link.module.css";

// react
import { ComponentProps } from "react";

// next
import { usePathname } from "next/navigation";
import { default as NextLink } from "next/link";

// other libraries
import { Link as RdxLink } from "@radix-ui/react-navigation-menu";

export default function Link({ href, className, children, ...props }: ComponentProps<typeof RdxLink>) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <RdxLink active={isActive} asChild {...props}>
      <NextLink href={href!} className={styles["link"]}>
        <div className={className}>{children}</div>
      </NextLink>
    </RdxLink>
  );
}
