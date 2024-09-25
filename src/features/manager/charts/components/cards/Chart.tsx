// react
import { ReactNode } from "react";

// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// types
interface ChartProps {
  title: string;
  subTitle?: string;
  options?: ReactNode;
  children: ReactNode;
}

export default function Chart({ title, subTitle, options, children }: ChartProps) {
  return (
    <Card>
      <CardHeader>
        {options ? (
          <section className="flex items-center justify-between gap-4">
            <CardTitle className="flex-1">{title}</CardTitle>
            <footer className="flex-none">{options}</footer>
          </section>
        ) : (
          <CardTitle>{title}</CardTitle>
        )}
        {subTitle && <CardDescription>{subTitle}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
