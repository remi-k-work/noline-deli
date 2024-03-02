// component css styles
import styles from "./ProductFilter.module.css";

// other libraries
import clsx from "clsx";

export default function ProductFilter({ byCompanyList, priceRangeMin, priceRangeMax }) {
  return (
    <article className={clsx(styles["product-filter"], "form")}>
      <p>Hello {priceRangeMin}</p>
    </article>
  );
}
