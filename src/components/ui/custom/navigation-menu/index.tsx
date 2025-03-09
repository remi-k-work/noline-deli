// component css styles
import styles from "./index.module.css";

// react
import { ComponentProps } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { Root as RdxRoot } from "@radix-ui/react-navigation-menu";

// components
import Viewport from "./Viewport";
import Content from "./Content";
import Indicator from "./Indicator";
import Item from "./Item";
import Link from "./Link";
import List from "./List";
import Trigger from "./Trigger";

export default function NavigationMenu({ className, children, ...props }: ComponentProps<typeof RdxRoot>) {
  return (
    <RdxRoot className={cn(styles["root"], className)} {...props}>
      {children}
      <Viewport />
    </RdxRoot>
  );
}

export {
  Content as NavigationMenuContent,
  Indicator as NavigationMenuIndicator,
  Item as NavigationMenuItem,
  Link as NavigationMenuLink,
  List as NavigationMenuList,
  Trigger as NavigationMenuTrigger,
};
