// react
import { ReactNode } from "react";

// components
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function Layout({ children }: { children: ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
