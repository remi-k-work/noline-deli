// react
import { ReactNode } from "react";

// types
interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return <main className="[grid-area:main]">{children}</main>;
}
