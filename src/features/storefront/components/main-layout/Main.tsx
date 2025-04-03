// react
import { ReactNode } from "react";

// types
interface MainProps {
  heading: string;
  children: ReactNode;
}

export default function Main({ heading, children }: MainProps) {
  return (
    <main className="container mx-auto px-4 py-4 [grid-area:main]">
      <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">{heading}</h1>
      {children}
    </main>
  );
}
