// react
import { ReactNode } from "react";

// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// types
interface ChartCardProps {
  title: string;
  subTitle?: string;
  options?: ReactNode;
  children: ReactNode;
}

export default function ChartCard({ title, subTitle, options, children }: ChartCardProps) {
  return (
    <Card>
      <CardHeader>
        {options ? (
          <section className="flex items-center justify-between gap-4">
            <CardTitle className="flex-1">{title}</CardTitle>
            <footer className="flex-none">{options}</footer>
          </section>
        ) : (
          <CardTitle className="flex-1">{title}</CardTitle>
        )}
        {subTitle && <CardDescription>{subTitle}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
