// component css styles
import styles from "./PriceTag.module.css";

// other libraries
import clsx from "clsx";
import { formatPrice } from "@/lib/helpers";

export default function PriceTag({ priceInCents }) {
  return <span className={clsx(styles["price-tag"], "badge")}>{formatPrice(priceInCents)}</span>;
}
