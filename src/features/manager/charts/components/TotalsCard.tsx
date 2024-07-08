// react
import { Fragment } from "react";

// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// types
interface TotalsCardProps {
  title: string;
  subTitles: string[];
  totals: number[];
}

export default function TotalsCard({ title, subTitles, totals }: TotalsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {subTitles.map((subTitle, subTitleIndex) => (
            <Fragment key={subTitleIndex}>{subTitle}, </Fragment>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {totals.map((total, totalIndex) => (
          <Fragment key={totalIndex}>{total}, </Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
