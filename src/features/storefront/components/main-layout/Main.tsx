// react
import { ReactNode } from "react";

// types
interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return <main className="container mx-auto px-4 py-4 [grid-area:main]">{children}</main>;
}
