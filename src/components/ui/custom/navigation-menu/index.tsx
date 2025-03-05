// component css styles
import styles from "./index.module.css";

// react
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

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

const NavigationMenu = forwardRef<ElementRef<typeof RdxRoot>, ComponentPropsWithoutRef<typeof RdxRoot>>(({ className, children, ...props }, ref) => (
  <RdxRoot ref={ref} className={cn(styles["root"], className)} {...props}>
    {children}
    <Viewport />
  </RdxRoot>
));
NavigationMenu.displayName = RdxRoot.displayName;

export default NavigationMenu;
export {
  Content as NavigationMenuContent,
  Indicator as NavigationMenuIndicator,
  Item as NavigationMenuItem,
  Link as NavigationMenuLink,
  List as NavigationMenuList,
  Trigger as NavigationMenuTrigger,
};
