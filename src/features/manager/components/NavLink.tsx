"use client";

// react
import { ComponentProps } from "react";

// next
import { usePathname } from "next/navigation";
import Link from "next/link";

// other libraries
import clsx from "clsx";

// types
interface NavLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {}

export default function NavLink(props: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={clsx(
        "bg-primary p-2 text-primary-content hover:bg-secondary hover:text-secondary-content focus-visible:bg-secondary focus-visible:text-secondary-content",
        pathname === props.href && "bg-accent text-accent-content",
      )}
    />
  );
}
