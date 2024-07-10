// component css styles
import styles from "./PriceTag.module.css";

// other libraries
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/helpers";

export default function PriceTag({ priceInCents }) {
  return <span className={cn(styles["price-tag"], "badge")}>{formatPrice(priceInCents)}</span>;
}
