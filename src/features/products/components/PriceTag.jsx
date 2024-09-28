// component css styles
import styles from "./PriceTag.module.css";

// other libraries
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";

export default function PriceTag({ priceInCents }) {
  return <span className={cn(styles["price-tag"], "badge")}>{formatCurrency(priceInCents)}</span>;
}
