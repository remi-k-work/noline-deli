// react
import { ReactNode } from "react";

// components
import Header from "@/features/manager/components/Header";
import Footer from "@/features/manager/components/Footer";

// types
interface TemplateProps {
  children: ReactNode;
}

export default async function Template({ children }: TemplateProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
