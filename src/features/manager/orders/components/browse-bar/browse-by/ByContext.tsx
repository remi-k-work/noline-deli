"use client";

// react
import { forwardRef } from "react";

// other libraries
import { useTanTableInstanceContext } from "../../../stores/tan-table-instance";

const ByContext = forwardRef<HTMLElement>(({ ...props }, ref) => {
  const {
    tableState: { currentDate, currentCustomDate, currentCustomerEmail, currentShippingMethod, currentStatus, currentBrand, isSearchMode, isBrowsingAll },
  } = useTanTableInstanceContext();

  if (isSearchMode)
    return (
      <footer ref={ref} {...props}>
        Search Results
      </footer>
    );

  if (isBrowsingAll)
    return (
      <footer ref={ref} {...props}>
        All Orders
      </footer>
    );

  return (
    <footer ref={ref} {...props}>
      {currentDate && "label" in currentDate ? (
        <p>
          By Date
          <br />
          <small>{currentDate.label}</small>
        </p>
      ) : currentCustomDate ? (
        <p>
          By Custom Date
          <br />
          <small>
            {currentCustomDate.from?.toDateString()}
            <br />
            {currentCustomDate.to ? currentCustomDate.to.toDateString() : "Today"}
          </small>
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
          <small>{currentStatus}</small>
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
});
ByContext.displayName = "ByContext";

export default ByContext;
