// other libraries
import { formatCurrency } from "@/lib/formatters";

// components
import { Badge } from "@/components/ui/badge";

// types
interface PriceProps {
  priceInCents: number;
}

export default function Price({ priceInCents }: PriceProps) {
  return <Badge className="w-fit text-base">{formatCurrency(priceInCents)}</Badge>;
}
