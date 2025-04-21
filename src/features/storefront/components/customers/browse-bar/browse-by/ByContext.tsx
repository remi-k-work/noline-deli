// other libraries
import { useInstanceContext } from "@/features/storefront/stores/customers/orders-table";
import { formatDate } from "@/lib/formatters";

export default function ByContext({ ...props }) {
  const {
    state: { currentDate, currentCustomDate, currentShippingMethod, currentStatus, currentBrand, isSearchMode, isBrowsingAll },
  } = useInstanceContext();

  if (isSearchMode) return <footer {...props}>Search Results</footer>;
  if (isBrowsingAll) return <footer {...props}>All Orders</footer>;

  return (
    <footer {...props}>
      {currentDate && "label" in currentDate ? (
        <p>
          By Date
          <br />
          <small>{currentDate.label}</small>
        </p>
      ) : currentCustomDate ? (
        <p>
          By Custom Date
          {currentCustomDate.from && (
            <>
              <br />
              <small>
                {formatDate(currentCustomDate.from)}
                <br />
                {currentCustomDate.to ? formatDate(currentCustomDate.to) : "Today"}
              </small>
            </>
          )}
        </p>
      ) : currentShippingMethod ? (
        <p>
          By Shipping
          <br />
          <small>{currentShippingMethod}</small>
        </p>
      ) : currentStatus ? (
        <p>
          By Status
          <br />
          <small>{currentStatus.replace("_", " ")}</small>
        </p>
      ) : (
        <p>
          By Brand
          <br />
          <small>{currentBrand}</small>
        </p>
      )}
    </footer>
  );
}
