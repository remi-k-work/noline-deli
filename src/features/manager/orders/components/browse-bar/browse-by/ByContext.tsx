// other libraries
import { useTanTableInstanceContext } from "@/features/manager/orders/stores/tan-table-instance";
import { formatDate } from "@/lib/formatters";

export default function ByContext({ ...props }) {
  const {
    tableState: { currentDate, currentCustomDate, currentCustomerEmail, currentShippingMethod, currentStatus, currentBrand, isSearchMode, isBrowsingAll },
  } = useTanTableInstanceContext();

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
      ) : currentCustomerEmail ? (
        <p>
          By Customer
          <br />
          <small>{currentCustomerEmail}</small>
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
