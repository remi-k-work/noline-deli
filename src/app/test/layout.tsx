// react
import { ReactNode } from "react";

// components
import { TooltipProvider } from "@/components/ui/tooltip";
import { CounterStoreProvider } from "./counter-store-provider";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <CounterStoreProvider initState={{ count: 10 }}>{children}</CounterStoreProvider>
    </TooltipProvider>
  );
}
